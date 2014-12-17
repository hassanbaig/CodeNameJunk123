using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(JunkCar.Presentation.Startup))]
namespace JunkCar.Presentation
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
