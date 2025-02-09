using Application.LanguageAgg.Sentence.Commands;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Web.Core.Common.Responses;
using Web.Core.Controllers;

namespace Web.LanguageAgg.Sentence.EndPoints;

[Route("/api/sentences")]
public class SentenceUpdateEndPoint : KApiController
{
    public SentenceUpdateEndPoint(IMediator mediator) : base(mediator)
    {
    }
    
    [HttpPut("{id:guid}")]
    public async Task<ApiRes> Create([FromRoute] Guid id, [FromForm] Body body)
    {
        await Mediator.Send(GenRequest(id, body));
        return new ApiRes();
    }

    private static SentenceUpdateCommand.Request GenRequest(Guid id, Body body)
    {
        return new SentenceUpdateCommand.Request
        {
            Id = id,
            Content = body.Content,
        };
    }

    public class Body
    {
        public string Content { get; set; }
    }
}