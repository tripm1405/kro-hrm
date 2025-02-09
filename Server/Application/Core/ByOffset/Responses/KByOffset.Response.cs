namespace Application.Core.ByOffset.Responses;

public class KOffsetResponse<TItem> : IKOffsetResponse<TItem>
    where TItem : new()
{
    public List<TItem> Items { get; set; } = new();
    public int? Size { get; set; }
    public int? Page { get; set; }
    public int Total { get; set; }
}