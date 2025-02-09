using Application.Core.Handlers;
using Domain.CategoryAgg;
using Domain.Core.Exceptions;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.CategoryAgg.Category.Commands;

public class CategoryUpdateCommand
{
    public class Request : IRequest<Unit>
    {
        public Guid Id { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
        public string? Description { get; set; }
        public bool IsDefault { get; set; }
    }

    public class Handler : KHandler<Request, Unit, CategoryEntity>
    {
        public Handler(ICategoryRepository repo) : base(repo)
        {
        }

        public override async Task<Unit> Handle(Request request, CancellationToken cancellationToken)
        {
            var queryable = Repo.GetQueryable();
            var entity = await queryable
                .AsNoTracking()
                .Where(e => e.Id == request.Id)
                .FirstOrDefaultAsync(cancellationToken: cancellationToken);
            if (entity == null)
            {
                throw new EntityNotFoundException(typeof(CategoryEntity));
            }
            
            entity.Code = request.Code;
            entity.Name = request.Name;
            entity.Description = request.Description;
            entity.IsDefault = request.IsDefault;
            
            await Repo.UpdateAsync(entity);

            return Unit.Value;
        }
    }
}