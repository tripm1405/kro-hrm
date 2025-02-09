using Application.CategoryAgg.Category.Commands;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Web.Core.Common.Responses;
using Web.Core.Controllers;

namespace Web.CategoryAgg.Category.EndPoints;

[Route("/api/categories")]
public class CategoryCreateEndPoint : KApiController
{
    public CategoryCreateEndPoint(IMediator mediator) : base(mediator)
    {
    }
    
    [HttpPost]
    public async Task<ApiRes> Create([FromForm] Body body)
    {
        await Mediator.Send(GenRequest(body));
        return new ApiRes();
    }

    private static CategoryCreateCommand.Request GenRequest(Body body)
    {
        return new CategoryCreateCommand.Request
        {
            Code = body.Code,
            Name = body.Name,
            Description = body.Description,
            RootId = body.RootId,
            IsDefault = body.IsDefault,
        };
    }

    public class Body
    {
        public string Code { get; set; }
        public string Name { get; set; }
        public string? Description { get; set; }
        public Guid? RootId { get; set; }
        public bool IsDefault { get; set; }
    }
}