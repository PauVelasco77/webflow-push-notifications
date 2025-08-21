import { PushNotifications } from "./components/push-notifications";

function App() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header Section - Tutellus Style */}
      <div className="bg-gradient-to-r from-primary/5 to-accent/5 border-b border-border">
        <div className="container mx-auto py-12 px-4">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium mb-6">
              🔔 Tutellus Notifications
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-4 leading-tight">
              Stay Connected with <span className="text-primary">Tutellus</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Recibe notificaciones sobre nuevos cursos, actualizaciones de tokenización y contenido exclusivo de la
              comunidad Web3
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto py-16 px-4">
        <div className="max-w-md mx-auto">
          <PushNotifications />
        </div>

        {/* Features Section - Tutellus Style */}
        <div className="mt-20 max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">¿Qué incluyen las notificaciones?</h2>
            <p className="text-lg text-muted-foreground">
              Mantente al día con todo lo que sucede en el ecosistema Tutellus
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-card rounded-xl p-6 shadow-sm border border-border hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-primary text-xl">📚</span>
              </div>
              <h3 className="text-lg font-semibold text-card-foreground mb-2">Nuevos Cursos</h3>
              <p className="text-muted-foreground">
                Sé el primero en conocer nuevos cursos de cripto, tokenización y Web3
              </p>
            </div>

            <div className="bg-card rounded-xl p-6 shadow-sm border border-border hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-accent text-xl">🪙</span>
              </div>
              <h3 className="text-lg font-semibold text-card-foreground mb-2">Tokenización</h3>
              <p className="text-muted-foreground">
                Actualizaciones sobre proyectos de tokenización y nuevas herramientas
              </p>
            </div>

            <div className="bg-card rounded-xl p-6 shadow-sm border border-border hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-success text-xl">👥</span>
              </div>
              <h3 className="text-lg font-semibold text-card-foreground mb-2">Comunidad</h3>
              <p className="text-muted-foreground">Eventos, talleres y contenido exclusivo de la comunidad Tutellus</p>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-16 text-center">
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            Las notificaciones respetan tu privacidad y puedes desactivarlas en cualquier momento desde la configuración
            de tu navegador
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
