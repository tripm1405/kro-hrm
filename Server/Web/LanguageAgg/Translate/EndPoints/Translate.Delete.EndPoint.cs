using Application.LanguageAgg.Translate.Commands;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Web.Core.Common.Responses;
using Web.Core.Controllers;

namespace Web.LanguageAgg.Translate.EndPoints;

[Route("/api/translates")]
public class TranslateDeleteEndPoint : KApiController
{
    public TranslateDeleteEndPoint(IMediator mediator) : base(mediator)
    {
    }
    
    [HttpDelete("{id}")]
    public async Task<ApiRes> Delete([FromRoute] Guid id)
    {
        await Mediator.Send(GenRequest(id));
        return new ApiRes();
    }

    private static TranslateDeleteCommand.Request GenRequest(Guid id)
    {
        return new TranslateDeleteCommand.Request
        {
            Id = id
        };
    }
}