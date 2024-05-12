import { Characteristics } from './features/characteristics/components/Characteristics';
import { Trains } from './features/trains/components/Trains';

function App() {
  return (
    <div className='App h-screen bg-gray-200'>
      <div className='container mx-auto px-4 py-4'>
        <h1 className='text-5xl font-bold text-center py-5'>Данные поездов</h1>
        <div className='flex gap-10'>
          <Trains />

          <Characteristics />
        </div>
      </div>
    </div>
  );
}

export default App;
