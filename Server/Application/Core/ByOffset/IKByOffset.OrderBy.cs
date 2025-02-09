using Application.Core.ByOffset.Enums;

namespace Application.Core.ByOffset;

public interface IKOffsetOrderBy
{
    public string Property { get; set; }
    public KByOffsetOrderByType Type { get; set; }
}