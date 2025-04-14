import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/expenses/review/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/expenses/review/"!</div>
}
