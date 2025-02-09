using Application.Core.ByOffset;
using Application.Core.ByOffset.Extensions;
using Application.Core.ByOffset.Requests;
using Application.Core.ByOffset.Responses;
using Application.Core.Responses;
using Application.LanguageAgg.Translate.DTOs;
using Application.LanguageAgg.Translate.Extensions;
using Domain.LanguageAgg;
using Microsoft.EntityFrameworkCore;

namespace Application.LanguageAgg.Translate.Queries;

public class TranslateOffsetQuery
{
    public class Response : KOffsetResponse<TranslateDto>
    {
    }

    public class Request : IKByByOffsetRequest<Response, TranslateDto, KByOffsetFilter, KByOffsetOrderBy>
    {
        public int? Size { get; set; }
        public int? Page { get; set; }
        public List<KByOffsetOrderBy>? Sort { get; set; }
        public List<KByOffsetFilter>? Filters { get; set; }
    }

    public class KHandler : KOffsetKHandler<Request, Response, TranslateDto, TranslateEntity, KByOffsetFilter,
        KByOffsetOrderBy>
    {
        public KHandler(ITranslateRepo repo) : base(repo)
        {
        }

        public override async Task<Response> Handle(Request request, CancellationToken cancellationToken)
        {
            var queryable = Repo.GetQueryable().AsNoTracking().Apply_ByOffset(request);

            var total = await queryable.CountAsync(cancellationToken: cancellationToken);

            var dtos = await queryable
                .Select(e => e.GenDto())
                .ToListAsync(cancellationToken: cancellationToken);

            return new Response
            {
                Items = dtos,
                Size = request.Size,
                Page = request.Page,
                Total = total,
            };
        }
    }
}