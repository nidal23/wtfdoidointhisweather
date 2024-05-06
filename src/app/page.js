import WeatherPage from "./components/weather";


export default function Home() {
  return (
    <main className="bg-primary-foreground flex min-h-screen flex-row items-center justify-center p-24">

      <div className="w-1/4 h-96 border rounded-lg p-2">
      <WeatherPage />
      </div>
    </main>
  );
}
