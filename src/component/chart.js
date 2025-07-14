
import { Doughnut } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend)

export default function TaskChart({ Done, InProgress, NotDone }) {
  const data = {
    labels: ['انجام شده', 'در حال انجام', 'انجام نشده'],
    datasets: [
      {
        data: [ Done, InProgress, NotDone],
        backgroundColor: ['#10B981	', '#F59E0B', '#EF4444'],
        borderWidth: 2,
        hoverOffset:12,
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
    <div style={{ width: '450px', margin: 'auto',height:"450px",animation:"revert-layer"}}>
      <Doughnut data={data} options={options} />
    </div>
  )
}
