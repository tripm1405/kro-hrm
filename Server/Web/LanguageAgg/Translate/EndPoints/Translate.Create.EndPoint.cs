using Application.LanguageAgg.Translate.Commands;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Web.Core.Common.Responses;
using Web.Core.Controllers;

namespace Web.LanguageAgg.Translate.EndPoints;

[Route("/api/translates")]
public class TranslateCreateEndPoint : KApiController
{
    public TranslateCreateEndPoint(IMediator mediator) : base(mediator)
    {
    }
    
    [HttpPost]
    public async Task<ApiRes> Create([FromForm] Body body)
    {
        await Mediator.Send(GenRequest(body));
        return new ApiRes();
    }

    private static TranslateCreateCommand.Request GenRequest(Body body)
    {
        return new TranslateCreateCommand.Request
        {
            Code = body.Code,
            Sentences = body.Sentences,
        };
    }

    public class Body
    {
        public string Code { get; set; }
        public List<TranslateCreateCommand.SentenceDto> Sentences { get; set; }
    }
}