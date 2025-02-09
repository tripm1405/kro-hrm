using Application.Core.ByOffset;
using Application.Core.ByOffset.Extensions;
using Application.Core.ByOffset.Requests;
using Application.Core.ByOffset.Responses;
using Application.Core.Responses;
using Application.LanguageAgg.Sentence.DTOs;
using Application.LanguageAgg.Sentence.Extensions;
using Domain.LanguageAgg;
using Microsoft.EntityFrameworkCore;

namespace Application.LanguageAgg.Sentence.Queries;

public class SentenceOffsetQuery
{
    public class Response : KOffsetResponse<SentenceDto>
    {
    }

    public class Request : IKByByOffsetRequest<Response, SentenceDto, KByOffsetFilter, KByOffsetOrderBy>
    {
        public TypeDto? Type { get; set; }
        public int? Size { get; set; }
        public int? Page { get; set; }
        public List<KByOffsetOrderBy> Sort { get; set; }
        public List<KByOffsetFilter> Filters { get; set; }
    }

    public class KHandler : KOffsetKHandler<Request, Response, SentenceDto, SentenceEntity, KByOffsetFilter, KByOffsetOrderBy>
    {
        public KHandler(ISentenceRepo repo) : base(repo)
        {
        }

        public override async Task<Response> Handle(Request request, CancellationToken cancellationToken)
        {
            var queryable = Repo.GetQueryable().AsNoTracking();
            if (request.Type?.Code != null)
            {
                queryable = queryable
                    .Include(e => e.Type)
                    .Where(e => e.Type.Code == request.Type.Code);
            }
            queryable = queryable.Apply_ByOffset(request);

            var total = await queryable.CountAsync(cancellationToken: cancellationToken);

            var dtos = await queryable
                .Include(e => e.Root)
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

    public class TypeDto
    {
        public string? Code { get; set; }
    }
}