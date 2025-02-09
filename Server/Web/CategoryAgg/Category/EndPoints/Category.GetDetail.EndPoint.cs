using Application.CategoryAgg.Category.Dtos;
using Application.CategoryAgg.Category.Queries;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Web.Core.Common.Responses;
using Web.Core.Controllers;

namespace Web.CategoryAgg.Category.EndPoints;

[Route("/api/categories")]
public class CategoryGetDetailEndPoint : KApiController
{
    public CategoryGetDetailEndPoint(IMediator mediator) : base(mediator)
    {
    }
    
    [HttpGet("{id}")]
    public async Task<ApiRes<CategoryDto>> GetDetail([FromRoute] Guid id)
    {
        var result = await Mediator.Send(GenRequest(id));
        return new ApiRes<CategoryDto>
        {
            Result = result,
        };
    }

    private static CategoryDetailQuery.Request GenRequest(Guid id)
    {
        return new CategoryDetailQuery.Request
        {
            Id = id
        };
    }
}