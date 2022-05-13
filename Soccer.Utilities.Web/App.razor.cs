using Avalonia.Web.Blazor;

namespace Soccer.Utilities.Web;

public partial class App
{
    protected override void OnParametersSet()
    {
        base.OnParametersSet();
        
        WebAppBuilder.Configure<Soccer.Utilities.App>()
            .SetupWithSingleViewLifetime();
    }
}