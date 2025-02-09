using Application.Core.ByOffset.Enums;

namespace Application.Core.ByOffset;

public class KByOffsetOrderBy : IKOffsetOrderBy
{
    public string Property { get; set; }
    public KByOffsetOrderByType Type { get; set; }
}