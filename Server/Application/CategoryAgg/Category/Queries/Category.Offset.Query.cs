using Application.CategoryAgg.Category.Dtos;
using Application.CategoryAgg.Category.Extensions;
using Application.Core.ByOffset;
using Application.Core.ByOffset.Extensions;
using Application.Core.ByOffset.Requests;
using Application.Core.ByOffset.Responses;
using Domain.CategoryAgg;
using Microsoft.EntityFrameworkCore;

namespace Application.CategoryAgg.Category.Queries;

public class CategoryOffsetQuery
{
    public class Response : KOffsetResponse<CategoryDto>
    {
    }
    
    public class Request : IKByByOffsetRequest<Response, CategoryDto, KByOffsetFilter, KByOffsetOrderBy>
    {
        public Guid? RootId { get; set; }
        public RootDto? Root { get; set; }
        public int? Size { get; set; }
        public int? Page { get; set; }
        public List<KByOffsetOrderBy>? Sort { get; set; }
        public List<KByOffsetFilter>? Filters { get; set; }
    }

    public class KHandler : KOffsetKHandler<Request, Response, CategoryDto, CategoryEntity, KByOffsetFilter,
        KByOffsetOrderBy>
    {
        public KHandler(ICategoryRepository repo) : base(repo)
        {
        }

        public override async Task<Response> Handle(Request request, CancellationToken cancellationToken)
        {
            var queryable = Repo
                .GetQueryable()
                .AsNoTracking();
            if (request.Root == null)
            {
                queryable = queryable.Where(e => e.RootId == request.RootId);
            }
            else if (request.Root.Code != null)
            {
                
                queryable = queryable
                    .Include(e => e.Root)
                    .Where(e => e.Root.Code == request.Root.Code);
            }
            queryable = queryable.Apply_ByOffset(request);

            var total = await queryable
                .CountAsync(cancellationToken: cancellationToken);

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

    public class RootDto
    {
        public string? Code { get; set; }
    }
}