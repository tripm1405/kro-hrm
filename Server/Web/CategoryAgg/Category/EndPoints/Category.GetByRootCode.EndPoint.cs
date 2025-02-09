using Application.CategoryAgg.Category.Dtos;
using Application.CategoryAgg.Category.Queries;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Web.Core.Common.Responses;
using Web.Core.Controllers;

namespace Web.CategoryAgg.Category.EndPoints;

[Route("/api/categories/by-root-code")]
public class CategoryGetByRootCodeEndPoint : KApiController
{
    public CategoryGetByRootCodeEndPoint(IMediator mediator) : base(mediator)
    {
    }
    
    [HttpGet]
    public async Task<ApiRes<List<CategoryDto>>> GetByRootCode([FromQuery] Query query)
    {
        var result = await Mediator.Send(GenRequest(query));
        return new ApiRes<List<CategoryDto>>
        {
            Result = result,
        };
    }

    private static CategoryRootCodeQuery.Request GenRequest(Query query)
    {
        return new CategoryRootCodeQuery.Request
        {
            RootCode = query.RootCode,
        };
    }
    
    public class Query
    {
        public string RootCode { get; set; }
    }
}