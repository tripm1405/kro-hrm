namespace Application.Core.ByOffset.Responses;

public interface IKOffsetResponse<TItem> : IKOffsetResponse
{
    List<TItem> Items { get; set; }
    int Total { get; set; }
}

public interface IKOffsetResponse
{
    int? Size { get; set; }
    int? Page { get; set; }
}