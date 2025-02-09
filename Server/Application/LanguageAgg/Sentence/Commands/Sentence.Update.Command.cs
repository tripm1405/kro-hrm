using Application.Core.Handlers;
using Domain.Core.Exceptions;
using Domain.LanguageAgg;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.LanguageAgg.Sentence.Commands;

public class SentenceUpdateCommand
{
    public class Request : IRequest<Unit>
    {
        public Guid Id { get; set; }
        public string Content { get; set; }
    }
    
    public class Handler : KHandler<Request, Unit, SentenceEntity>
    {
        public Handler(ISentenceRepo repo) : base(repo)
        {
        }

        public override async Task<Unit> Handle(Request request, CancellationToken cancellationToken)
        {
            var queryable = Repo.GetQueryable();
            
            var entity = await queryable
                .AsNoTracking()
                .Where(e => e.Id == request.Id)
                .FirstOrDefaultAsync(cancellationToken: cancellationToken);
            
            if (entity == null) throw new EntityNotFoundException(typeof(SentenceEntity));

            entity.Content = request.Content;
            
            await Repo.UpdateAsync(entity);

            return Unit.Value;
        }
    }
}