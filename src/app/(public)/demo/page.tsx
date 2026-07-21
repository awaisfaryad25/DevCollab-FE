import React from 'react'
import { Button } from "@/app/ui/Button";
import { ArrowRight, Plus } from 'lucide-react';
import { Tooltip } from '@/app/ui/Tooltip';

const Demo = () => {
  return (
    <div className='p-6 w-full max-w-7xl mx-auto space-y-6'>
      <hr />
      <h2 className='text-primary font-semibold'>Buttons</h2>
      <div className="space-y-6 mt-6">

        {/*  variants */}
        <div className="flex flex-wrap gap-6">
          <h2 className='text-primary font-semibold'>Button Variants</h2>

          <Button variant="primary">p Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="gradient">Gradient</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="danger">Delete</Button>
          <Button variant="ghost">ghost</Button>
          <Button variant="gold">Upgrade to Pro ✦</Button>
          <Button variant="link">View details</Button>
        </div>

        <div className="flex flex-wrap gap-6">
          <h2 className='text-primary font-semibold'>Button as Next.js Link</h2>
          <Button href="/dashboard">Go to dashboard</Button>
          <Button href="https://stripe.com" external variant="outline">Stripe docs</Button>
        </div>        

        <div className="flex flex-wrap gap-6">
          <h2 className='text-primary font-semibold'>Button sizes</h2>
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
        </div>          

        <div className="flex flex-wrap gap-6">
          <h2 className='text-primary font-semibold'>Button with icons + loading </h2>
          <Button leftIcon={<Plus className="h-4 w-4" />}>New project</Button>
          <Button rightIcon={<ArrowRight className="h-4 w-4" />}>Continue</Button>
          <Button loading>Saving...</Button>
          <Button fullWidth>Full Width</Button>
        </div>
      
      </div>

      <hr />

      <h2 className='text-primary font-semibold'>Tooltip </h2>
      <div className="flex flex-wrap gap-6">
        <Tooltip content="Copy to clipboard" position="top">
          <button>Copy</button>
        </Tooltip>

        <Tooltip content="Admin only action" position="right" delay={100}>
          <Button variant="danger">Delete all</Button>
        </Tooltip>
      </div>

      <hr />
      {/* <h2 className='text-primary font-semibold'>Button </h2> */}
      <div className="flex flex-wrap gap-6">

      </div>


    </div>
  )
}

export default Demo