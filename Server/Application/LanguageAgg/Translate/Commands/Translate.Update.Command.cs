using Application.Core.Handlers;
using Domain.Core.Exceptions;
using Domain.LanguageAgg;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.LanguageAgg.Translate.Commands;

public class TranslateUpdateCommand
{
    public class Request : IRequest<Unit>
    {
        public Guid Id { get; set; }
        public string Code { get; set; }
        
        public List<SentenceDto> Sentences { get; set; }
    }

    public class Handler : KHandler<Request, Unit, TranslateEntity>
    {
        public Handler(ITranslateRepo repo) : base(repo)
        {
        }

        public override async Task<Unit> Handle(Request request, CancellationToken cancellationToken)
        {
            var queryable = Repo.GetQueryable();
            var entity = await queryable
                .AsNoTracking()
                .Include(e => e.Sentences)
                .Where(e => e.Id == request.Id)
                .FirstOrDefaultAsync(cancellationToken: cancellationToken);
            if (entity == null)
            {
                throw new EntityNotFoundException(typeof(TranslateEntity));
            }
            
            entity.Code = request.Code;
            entity.Sentences = request.Sentences
                .Select(e =>
                {
                    if (!e.Id.HasValue) return new SentenceEntity
                    {
                        TypeId = e.TypeId,
                        Content = e.Content,
                    };
                    var entityNested = entity.Sentences
                        .FirstOrDefault(e1 => e1.Id == e.Id.Value);
                    if (entityNested == null) return new SentenceEntity
                    {
                        TypeId = e.TypeId,
                        Content = e.Content,
                    };
                    
                    entityNested.Content = e.Content;
                    return entityNested;
                })
                .ToList();
            
            await Repo.UpdateAsync(entity);

            return Unit.Value;
        }
    }
    
    public class SentenceDto {
        public Guid? Id { get; set; }
        public Guid TypeId { get; set; }
        public string Content { get; set; }
    }
}