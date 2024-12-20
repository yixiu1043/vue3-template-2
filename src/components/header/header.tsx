import 'vant/es/nav-bar/style'
import { NavBar, type NavBarProps } from 'vant'
import style from './header.module.less'
import { goBack, type Path } from '@/utils/go-back'

const threshold = Array.from({ length: 11 }).map((_, i) => i / 10)

const ob = new IntersectionObserver(
  ([entry]) => {
    const n = Math.round(entry.intersectionRatio * 10)
      // alpha.value = 1 - threshold[n]

    ;(entry.target.previousElementSibling as HTMLElement).style.backgroundColor =
      `rgba(49,0,102,${1 - threshold[n]})`
  },
  {
    threshold,
  },
)

export default defineComponent<
  Partial<NavBarProps & { colour: boolean } & { to: Path; url: Path }>
>({
  setup(props, { attrs, slots }) {
    const route = useRoute()
    const placeholder = ref<HTMLDivElement | null>(null)
    //@ts-ignore
    const bar = ref<InstanceType<typeof NavBar> | null>(null)
    const alpha = ref(0)
    const color = computed(() => (props.colour ? `rgba(49,0,102,${alpha.value})` : undefined))
    const handle: any =
      attrs.onClickLeft ||
      function () {
        history.back()
      }
    watchEffect(
      () => {
        console.log(bar.value)

        if (bar.value?.fixed && placeholder.value) {
          placeholder.value!.style.height = bar.value!.$el.offsetHeight + 'px'
          if ((bar.value as any).colour) {
            ob.observe(placeholder.value!)
          }
        } else if (placeholder.value) {
          placeholder.value!.style.height = '0px'
          ob.unobserve(placeholder.value!)
        }
      },
      { flush: 'post' },
    )

    return () => (
      <>
        <NavBar
          ref={bar}
          z-index="100"
          left-arrow
          class={style.header}
          title={route.meta.title}
          border={false}
          onClickLeft={handle}
          {...attrs}
        >
          {slots}
        </NavBar>
        {bar.value?.fixed && (
          <div
            ref={placeholder}
            class={style.placeholder}
          ></div>
        )}
      </>
    )
  },
})
