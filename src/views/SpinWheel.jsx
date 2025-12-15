import SpinWheel from '../components/SpinWheel/SpinWheel';

export default function SpinWheelView() {
    // You can customize segments by passing them as props:
    // const customSegments = [
    //   { id: 1, number: 10, percentage: 30 },
    //   { id: 2, number: 20, percentage: 25 },
    //   { id: 3, number: 50, percentage: 20 },
    //   { id: 4, number: 100, percentage: 15 },
    //   { id: 5, number: 200, percentage: 10 },
    // ];
    
    return (
        <div className="min-h-screen bg-white dark:bg-gray-900 py-8">
            <SpinWheel 
                percentages={{
                    10: 50,   // 50% chance to win 10 points
                    25: 30,   // 30% chance to win 25 points
                    50: 15,   // 15% chance to win 50 points
                    100: 5,   // 5% chance to win 100 points
                }}
            />
        </div>
    )
}

