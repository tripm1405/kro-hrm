using Application.LanguageAgg.Translate.DTOs;
using Application.LanguageAgg.Translate.Queries;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Web.Core.Common.Responses;
using Web.Core.Controllers;

namespace Web.LanguageAgg.Translate.EndPoints;

[Route("/api/translates")]
public class TranslateGetDetailEndPoint : KApiController
{
    public TranslateGetDetailEndPoint(IMediator mediator) : base(mediator)
    {
    }
    
    [HttpGet("{id}")]
    public async Task<ApiRes<TranslateDetailDto>> GetDetail([FromRoute] Guid id)
    {
        var result = await Mediator.Send(GenRequest(id));
        return new ApiRes<TranslateDetailDto>
        {
            Result = result,
        };
    }

    private static TranslateDetailQuery.Request GenRequest(Guid id)
    {
        return new TranslateDetailQuery.Request
        {
            Id = id
        };
    }
}