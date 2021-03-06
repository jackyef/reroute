import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const routes = [
    {
      "source": "/reroute/test",
      "destination": "https://jackyef.com"
    },
    {
      "source": "/AUm-e4YM8Q",
      "destination": "https://github.com/jackyef"
    },
    {
      "source": "/0ckMXlVSzH",
      "destination": "https://twitter.com/jackyef__"
    },
    {
      "source": "/tQoQ--21nb",
      "destination": "https://jackyef.com/posts/6-things-i-learned-during-my-remote-job-search"
    },
    {
      "source": "/qHeBGtZHPi",
      "destination": "https://jackyef.com/posts/writing-your-own-css-in-js-library"
    },
    {
      "source": "/Tr0_-I219q",
      "destination": "https://mazipan.space"
    },
    {
      "source": "/6GmU7WP_-s",
      "destination": "https://twitter.com/home"
    },
    {
      "source": "/dt7UyZ3AaU",
      "destination": "https://twitter.com/home"
    },
    {
      "source": "/cnIcmxP1fr",
      "destination": "https://twitter.com/home"
    },
    {
      "source": "/_Oq0VpeVCE",
      "destination": "https://twitter.com/home"
    },
    {
      "source": "/wJkHWNGcV4",
      "destination": "https://twitter.com"
    },
    {
      "source": "/YTRZJofynL",
      "destination": "http://g.co/1"
    },
    {
      "source": "/Vxw9PWdV2t",
      "destination": "https://opakholis.me"
    },
    {
      "source": "/fMudwBnjf7",
      "destination": "https://stripe.com"
    },
    {
      "source": "/cz37H3n1Bs",
      "destination": "https://reroute.vercel.app/"
    },
    {
      "source": "/wkQEO8_vNL",
      "destination": "http://www.google.com"
    },
    {
      "source": "/U04kcz3kpy",
      "destination": "https://jackyef.com/"
    },
    {
      "source": "/16e0hy712T",
      "destination": "http://backup.stmik-time.ac.id/"
    },
    {
      "source": "/8Uy1oFXtpe",
      "destination": "https://reroute.vercel.app/"
    },
    {
      "source": "/IVjLnIoP5p",
      "destination": "https://github.com/willshen8/url-shortener"
    },
        {
      "source": "/G9w1EpQqsh",
      "destination": "https://youtube.com"
    },
    {
      "source": "/vYbq_ZyGR9",
      "destination": "https://google.com"
    },
    {
      "source": "/QsFg_oBCq-",
      "destination": "https://google.com"
    },
    {
      "source": "/Ggd487_KYP",
      "destination": "https://satyawikananda.vercel.app"
    },
    {
      "source": "/skBgzL6lpp",
      "destination": "https://reroute.vercel.app/"
    },
    {
      "source": "/wVMU2PUUVH",
      "destination": "https://kalwabed.xyz"
    },
    {
      "source": "/49xDXQtzCD",
      "destination": "https://reroute.vercel.app/"
    },
    {
      "source": "/r0T4Oon46j",
      "destination": "https://twitter.com"
    },
    {
      "source": "/vxMXkigcV9",
      "destination": "https://zicklepop.com"
    }
]

async function main() {
  const dbRouteItems = routes.map(r => ({
    id: r.source.replace('\/', ''),
    destination: r.destination,
  }))

  console.log('records count:', await prisma.routes.count())

  await prisma.routes.createMany({ data: dbRouteItems, skipDuplicates: true })

  console.log('inserted routes!')
  console.log('records count:', await prisma.routes.count())
}

main()
  .catch((e) => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })