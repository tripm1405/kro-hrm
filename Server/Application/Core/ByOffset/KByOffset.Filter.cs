using Application.Core.ByOffset.Enums;

namespace Application.Core.ByOffset;

public class KByOffsetFilter : IKByOffsetFilter
{
    public string Property { get; set; }
    public KByOffsetFilterType Type { get; set; }
    // public IKByOffsetFilterData Data { get; set; }
    public List<string> Data { get; set; }
}