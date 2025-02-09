using Domain.LanguageAgg;
using MediatR;

namespace Application.LanguageAgg.Translate.Commands;

public class TranslateCreateCommand
{
    public class Request : IRequest<Unit>
    {
        public string Code { get; set; }
        
        public List<SentenceDto> Sentences { get; set; }
    }
    
    public class Handler : Core.Handlers.KHandler<Request, Unit, TranslateEntity>
    {
        public Handler(ITranslateRepo repo) : base(repo)
        {
        }

        public override async Task<Unit> Handle(Request request, CancellationToken cancellationToken)
        {
            var entity = new TranslateEntity
            {
                Code = request.Code,
                Sentences = request.Sentences.Select(e => new SentenceEntity
                {
                    TypeId = e.TypeId,
                    Content = e.Content,
                }).ToList(),
            };
            
            await Repo.CreateAsync(entity);

            return Unit.Value;
        }
    }
    
    public class SentenceDto {
        public Guid TypeId { get; set; }
        public string Content { get; set; }
    }
}