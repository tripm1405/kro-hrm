using Application.Core.Handlers;
using Domain.Core.Exceptions;
using Domain.LanguageAgg;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.LanguageAgg.Translate.Commands;

public class TranslateDeleteCommand
{
    public class Request : IRequest<Unit>
    {
        public Guid Id { get; set; }
    }
    
    public class Handler : KHandler<Request, Unit, TranslateEntity>
    {
        public Handler(ITranslateRepo repo) : base(repo)
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
                throw new EntityNotFoundException(typeof(TranslateEntity));
            }
            
            await Repo.DeleteAsync(entity);

            return Unit.Value;
        }
    }
}