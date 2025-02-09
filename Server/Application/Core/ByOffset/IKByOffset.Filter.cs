using Application.Core.ByOffset.Enums;

namespace Application.Core.ByOffset;

public interface IKByOffsetFilter
{
    string Property { get; set; }
    KByOffsetFilterType Type { get; set; }
    // IKByOffsetFilterData Data { get; set; }
    List<string> Data { get; set; }
}

public interface IKByOffsetFilterData
{
}