using Domain.CategoryAgg;
using MediatR;

namespace Application.CategoryAgg.Category.Commands;

public class CategoryCreateCommand
{
    public class Request : IRequest<Unit>
    {
        public string Code { get; set; }
        public string Name { get; set; }
        public string? Description { get; set; }
        public Guid? RootId { get; set; }
        public bool IsDefault { get; set; }
    }
    
    public class Handler : Core.Handlers.KHandler<Request, Unit, CategoryEntity>
    {
        public Handler(ICategoryRepository repo) : base(repo)
        {
        }

        public override async Task<Unit> Handle(Request request, CancellationToken cancellationToken)
        {
            var entity = new CategoryEntity
            {
                Code = request.Code,
                Name = request.Name,
                Description = request.Description,
                RootId = request.RootId,
                IsDefault = request.IsDefault,
            };
            
            await Repo.CreateAsync(entity);

            return Unit.Value;
        }
    }
}