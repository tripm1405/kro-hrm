using Application.LanguageAgg.Translate.DTOs;
using Application.LanguageAgg.Translate.Extensions;
using Domain.Core.Exceptions;
using Domain.LanguageAgg;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.LanguageAgg.Translate.Queries;

public class TranslateDetailQuery
{
    public class Request : IRequest<TranslateDetailDto>
    {
        public Guid Id { get; set; }
    }

    public class KHandler : Core.Handlers.KHandler<Request, TranslateDetailDto, TranslateEntity>
    {
        public KHandler(ITranslateRepo repo) : base(repo)
        {
        }

        public override async Task<TranslateDetailDto> Handle(Request request, CancellationToken cancellationToken)
        {
            var queryable = Repo.GetQueryable().AsNoTracking();

            var entity = await queryable
                .Include(e => e.Sentences)
                .Where(e => e.Id == request.Id)
                .Select(e => e.GenDetailDto())
                .FirstOrDefaultAsync(cancellationToken: cancellationToken);
            
            if (entity == null)
            {
                throw new EntityNotFoundException(typeof(TranslateEntity));
            }

            return entity;
        }
    }
}