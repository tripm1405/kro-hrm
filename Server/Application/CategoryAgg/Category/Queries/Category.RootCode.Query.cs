using Application.CategoryAgg.Category.Dtos;
using Application.CategoryAgg.Category.Extensions;
using Domain.CategoryAgg;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.CategoryAgg.Category.Queries;

public class CategoryRootCodeQuery
{
    public class Request : IRequest<List<CategoryDto>>
    {
        public string RootCode { get; set; }
    }
    
    public class KHandler : Core.Handlers.KHandler<Request, List<CategoryDto>, CategoryEntity>
    {
        public KHandler(ICategoryRepository repo) : base(repo)
        {
        }

        public override async Task<List<CategoryDto>> Handle(Request request, CancellationToken cancellationToken)
        {
            var queryable = Repo.GetQueryable().AsNoTracking();

            var entities = await queryable
                .Include(e => e.Root)
                .Where(e => e.Root.Code == request.RootCode)
                .Select(e => (CategoryDto)e.GenDto())
                .ToListAsync(cancellationToken: cancellationToken);

            return entities;
        }
    }
}