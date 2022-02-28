import { ListVariant, ListScale } from './types'

export default {
  variant: {
    [ListVariant.default]:
      'bg-teal-100 hover:bg-opacity-80 text-neutral-900 focus:outline-none focus:ring focus:ring-sm focus:ring-teal-200 focus:ring-opacity-50',
    [ListVariant['secondary-outline']]:
      'text-yellow-800 border-solid border-yellow-500 border-ss motion-reduced:hover:translate-0 hover:transform transition-all hover:-translate-y-2 hover:shadow-yellow-900 focus:shadow-yellow-900',
  },
  scale: {
    [ListScale.default]: 'text-ss py-1.5 px-3 rounded-sm font-700 tracking-md',
    [ListScale.small]: 'text-ss py-1.5 px-3 rounded-sm font-700 tracking-md',
  },
}
