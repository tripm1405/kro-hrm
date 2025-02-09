using Application.CategoryAgg.Category.Commands;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Web.Core.Common.Responses;
using Web.Core.Controllers;

namespace Web.CategoryAgg.Category.EndPoints;

[Route("/api/categories")]
public class CategoryDeleteEndPoint : KApiController
{
    public CategoryDeleteEndPoint(IMediator mediator) : base(mediator)
    {
    }
    
    [HttpDelete("{id}")]
    public async Task<ApiRes> Delete([FromRoute] Guid id)
    {
        await Mediator.Send(GenRequest(id));
        return new ApiRes();
    }

    private static CategoryDeleteCommand.Request GenRequest(Guid id)
    {
        return new CategoryDeleteCommand.Request
        {
            Id = id
        };
    }
}