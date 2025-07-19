
import { Doughnut } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend)

export default function TaskChart({ NotDone, InProgress, Done }) {
  const data = {
    labels: ['NotDone', 'InProgress', 'Done'],
    datasets: [
      {
       data: [NotDone, InProgress, Done],
       backgroundColor: ['#EF4444', '#F59E0B', '#10B981'],
        borderWidth: 2,
        hoverOffset:16,
      },
    ],
  }

  const options = {
  cutout: '40%',        // وسط چارت چقدر بریده باشه
  radius: '100%',       // اندازه دایره
  rotation: 0,          // از چه زاویه‌ای شروع کنه (درجه)
  circumference: 360,   // چه مقداری از دایره رو نشون بده
  plugins: {
    legend: { position: 'bottom' },
  },
  animation: {
    animateRotate: true,
    animateScale: true,
  }
}

  return (
    <div className="w-full max-w-xs mx-auto h-[350px] animate-none sm:h-[300px] md:h-[350px] lg:h-[400px]">
  <Doughnut data={data} options={options} />
</div>

  )
}
