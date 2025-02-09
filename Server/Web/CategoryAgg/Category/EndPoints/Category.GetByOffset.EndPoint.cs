using Application.CategoryAgg.Category.Queries;
using Application.Core.ByOffset;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Web.Core.Common.Extensions;
using Web.Core.Common.Responses;
using Web.Core.Controllers;

namespace Web.CategoryAgg.Category.EndPoints;

[Route("/api/categories")]
public class CategoryGetByOffsetEndPoint : KApiController
{
    public CategoryGetByOffsetEndPoint(IMediator mediator) : base(mediator)
    {
    }
    
    [HttpGet]
    public async Task<ApiRes<CategoryOffsetQuery.Response>> GetByOffset([FromQuery] Query query)
    {
        var result = await Mediator.Send(GenRequest(query));
        return result.GenOffsetResponse();
    }

    private static CategoryOffsetQuery.Request GenRequest(Query query)
    {
        var request = query.GenOffsetRequest<CategoryOffsetQuery.Request, KByOffsetFilter, KByOffsetOrderBy>();
        request.RootId = query.RootId;
        request.Root = query.Root;
        return request;
    }

    public class Query : IKByOffsetQuery<KByOffsetFilter, KByOffsetOrderBy>
    {
        public int? Size { get; set; }
        public int? Page { get; set; }
        public List<KByOffsetFilter> Filters { get; set; } = new List<KByOffsetFilter>();
        public List<KByOffsetOrderBy> Sort { get; set; } = new List<KByOffsetOrderBy>();
        public Guid? RootId { get; set; }
        public CategoryOffsetQuery.RootDto? Root { get; set; }
    }
}