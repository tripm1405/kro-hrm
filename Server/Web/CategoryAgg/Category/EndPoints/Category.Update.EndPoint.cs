using Application.CategoryAgg.Category.Commands;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Web.Core.Common.Responses;
using Web.Core.Controllers;

namespace Web.CategoryAgg.Category.EndPoints;

[Route("/api/categories")]
public class CategoryUpdateEndPoint : KApiController
{
    public CategoryUpdateEndPoint(IMediator mediator) : base(mediator)
    {
    }
    
    [HttpPut("{id:guid}")]
    public async Task<ApiRes> Create([FromRoute] Guid id, [FromForm] Body body)
    {
        await Mediator.Send(GenRequest(id, body));
        return new ApiRes();
    }

    private static CategoryUpdateCommand.Request GenRequest(Guid id, Body body)
    {
        return new CategoryUpdateCommand.Request
        {
            Id = id,
            Code = body.Code,
            Name = body.Name,
            Description = body.Description,
            IsDefault = body.IsDefault,
        };
    }

    public class Body
    {
        public string Code { get; set; }
        public string Name { get; set; }
        public string? Description { get; set; }
        public bool IsDefault { get; set; }
    }
}