& {iisreset}
dotnet publish -p:PublishProfile=.\NavaIT.Dictionary.App\Properties\PublishProfiles\IISProfile.pubxml
dotnet publish -p:PublishProfile=.\NavaIT.Dictionary.Web\Properties\PublishProfiles\IISProfile.pubxml
