using Application.Core.ByOffset;
using Application.LanguageAgg.Translate.Queries;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Web.Core.Common.Extensions;
using Web.Core.Common.Responses;
using Web.Core.Controllers;
using Web.Core.GetByOffset;

namespace Web.LanguageAgg.Translate.EndPoints;

[Route("/api/translates")]
public class TranslateGetByOffsetEndPoint : KApiController
{
    public TranslateGetByOffsetEndPoint(IMediator mediator) : base(mediator)
    {
    }
    
    [HttpGet]
    public async Task<ApiRes<TranslateOffsetQuery.Response>> GetByOffset([FromQuery] Query query)
    {
        var result = await Mediator.Send(GenRequest(query));
        return result.GenOffsetResponse();
    }

    private static TranslateOffsetQuery.Request GenRequest(Query query)
    {
        return query.GenOffsetRequest<TranslateOffsetQuery.Request, KByOffsetFilter, KByOffsetOrderBy>();
    }

    public class Query : IKByGetByOffsetQuery<KByOffsetFilter, KByOffsetOrderBy>
    {
        public int? Size { get; set; }
        public int? Page { get; set; }
        public List<KByOffsetFilter> Filters { get; set; } = new List<KByOffsetFilter>();
        public List<KByOffsetOrderBy> Sort { get; set; } = new List<KByOffsetOrderBy>();
    }
}