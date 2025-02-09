using Application.CategoryAgg.Category.Dtos;
using Application.CategoryAgg.Category.Extensions;
using Domain.CategoryAgg;
using Domain.Core.Exceptions;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.CategoryAgg.Category.Queries;

public class CategoryDetailQuery
{
    public class Request : IRequest<CategoryDto>
    {
        public Guid Id { get; set; }
    }

    public class KHandler : Core.Handlers.KHandler<Request, CategoryDto, CategoryEntity>
    {
        public KHandler(ICategoryRepository repo) : base(repo)
        {
        }

        public override async Task<CategoryDto> Handle(Request request, CancellationToken cancellationToken)
        {
            var queryable = Repo.GetQueryable().AsNoTracking();

            var entity = await queryable
                .Where(e => e.Id == request.Id)
                .Select(e => (CategoryDto)e.GenDto())
                .FirstOrDefaultAsync(cancellationToken: cancellationToken);
            
            if (entity == null)
            {
                throw new EntityNotFoundException(typeof(CategoryEntity));
            }

            return entity;
        }
    }
}