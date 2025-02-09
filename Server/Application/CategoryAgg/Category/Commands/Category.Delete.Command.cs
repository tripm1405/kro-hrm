using Application.Core.Handlers;
using Domain.CategoryAgg;
using Domain.Core.Exceptions;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.CategoryAgg.Category.Commands;

public class CategoryDeleteCommand
{
    public class Request : IRequest<Unit>
    {
        public Guid Id { get; set; }
    }
    
    public class Handler : KHandler<Request, Unit, CategoryEntity>
    {
        public Handler(ICategoryRepository repo) : base(repo)
        {
        }

        public override async Task<Unit> Handle(Request request, CancellationToken cancellationToken)
        {
            var queryable = Repo.GetQueryable().AsNoTracking();
            var entity = await queryable
                .Where(e => e.Id == request.Id)
                .FirstOrDefaultAsync(cancellationToken: cancellationToken);
            if (entity == null)
            {
                throw new EntityNotFoundException(typeof(CategoryEntity));
            }
            
            await Repo.DeleteAsync(entity);

            return Unit.Value;
        }
    }
}