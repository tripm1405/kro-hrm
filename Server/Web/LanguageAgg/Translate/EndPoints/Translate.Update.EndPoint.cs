using Application.LanguageAgg.Translate.Commands;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Web.Core.Common.Responses;
using Web.Core.Controllers;

namespace Web.LanguageAgg.Translate.EndPoints;

[Route("/api/translates")]
public class TranslateUpdateEndPoint : KApiController
{
    public TranslateUpdateEndPoint(IMediator mediator) : base(mediator)
    {
    }
    
    [HttpPut("{id:guid}")]
    public async Task<ApiRes> Create([FromRoute] Guid id, [FromForm] Body body)
    {
        await Mediator.Send(GenRequest(id, body));
        return new ApiRes();
    }

    private static TranslateUpdateCommand.Request GenRequest(Guid id, Body body)
    {
        return new TranslateUpdateCommand.Request
        {
            Id = id,
            Code = body.Code,
            Sentences = body.Sentences,
        };
    }

    public class Body
    {
        public string Code { get; set; }
        public List<TranslateUpdateCommand.SentenceDto> Sentences { get; set; }
    }
}