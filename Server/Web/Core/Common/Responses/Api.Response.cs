namespace Web.Core.Common.Responses;

public interface IApiRes
{
    string? Message { get; set; }
    bool Success { get; set; }
}

public interface IApiRes<TResult> : IApiRes
{
    TResult? Result { get; set; }
}

public class ApiRes : IApiRes {
    public string? Message { get; set; }
    public bool Success { get; set; } = true;
}

public class ApiRes<TResult> : ApiRes
{
    public TResult? Result { get; set; }
}