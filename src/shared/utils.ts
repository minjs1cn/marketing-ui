export function getSlot(ctx: any, name: string = 'default') {
  const slotFunction = ctx.$slots[name] as Function
  return slotFunction ? slotFunction() : ''
}