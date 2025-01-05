"use client"

import { useAtom, useAtomValue } from "jotai"
import { Button } from "../ui/button"
import { ScrollArea } from "../ui/scroll-area"
import { nodesAtom } from "@/features/flow/components/react-flow"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion"
import { useMemo } from "react"
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"
import { v4 as uuidv4 } from 'uuid';

export const Sidebar = () => {
  const [nodes, setNodes] = useAtom(nodesAtom);

  const workflows = useMemo(() => {
    return nodes.filter((v) => v.type === "workflow")
  }, [nodes]);

  const jobs = useMemo(() => {
    return nodes.filter((v) => v.type === "job")
  }, [nodes]);
  
  const steps = useMemo(() => {
    return nodes.filter((v) => v.type === "step")
  }, [nodes]);

  const onCreateNode = (type: "workflow" | "job" | "step") => {

    setNodes([...nodes, {
      id: uuidv4(),
      position: {
        x: type === "workflow" ? 0 : type === "job" ? 400 : 800,
        y: type === "workflow" ? workflows.length * 200 : type === "job" ? jobs.length * 200 : steps.length * 200
      },
      data: {
        name: ""
      },
      type: type
    }])
  }

  return (
    <div className="pt-3 px-4 font-noto-sans-jp">
      <ScrollArea className='w-[calc(100%+0.75rem)] h-[calc(100vh-8.5rem)] pr-3'>
        <div className='flex flex-col gap-4'>
          <div>
            <div className='flex items-center justify-between'>
              <p className='text-gray-500 text-xs'>ワークフロー</p>
              <Button
                variant="outline"
                size="sm"
                className='h-6 rounded-sm'
                onClick={() => onCreateNode("workflow")}
                >
                追加
              </Button>
            </div>
            <Accordion type="single" collapsible>
              {workflows.map((workflow) => (
                <AccordionItem value={workflow.id} key={workflow.id}>
                  <AccordionTrigger
                    className='py-2 hover:no-underline outline-none'
                  >
                    {(workflow.data.name as string) ? workflow.data.name as string : `${workflow.id}`}
                  </AccordionTrigger>
                  <AccordionContent className='flex flex-col gap-2'>
                    <div className='flex flex-col gap-1'>
                      <h4 className='text-[10px] text-muted-foreground'>name</h4>
                      <div
                        className='px-[2px]'
                      >
                        <Input
                          className='h-7 px-2 text-xs rounded-sm'
                          defaultValue={workflow.data.name as string}
                        />
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
          <div>
            <div className='flex items-center justify-between'>
              <p className='text-gray-500 text-xs'>ジョブ</p>
              <Button
                variant="outline"
                size="sm"
                className='h-6 rounded-sm'
                onClick={() => onCreateNode("job")}
                >
                追加
              </Button>
            </div>
            <Accordion type="single" collapsible>
              {jobs.map((job) => (
                <AccordionItem value={job.id} key={job.id}>
                  <AccordionTrigger
                    className='py-2 hover:no-underline outline-none'
                  >
                    {(job.data.name as string) ? job.data.name as string : `${job.id}`}
                  </AccordionTrigger>
                  <AccordionContent className='flex flex-col gap-2'>
                    <div className='flex flex-col gap-1'>
                      <h4 className='text-[10px] text-muted-foreground'>name</h4>
                      <div
                        className='px-[2px]'
                      >
                        <Input
                          className='h-7 px-2 text-xs rounded-sm'
                          defaultValue={job.data.name as string}
                        />
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
          <div>
            <div className='flex items-center justify-between'>
              <p className='text-gray-500 text-xs'>ステップ</p>
              <Button
                variant="outline"
                size="sm"
                className='h-6 rounded-sm'
                onClick={() => onCreateNode("step")}
                >
                追加
              </Button>
            </div>
            <Accordion type="single" collapsible>
              {steps.map((step) => (
                <AccordionItem value={step.id} key={step.id}>
                  <AccordionTrigger
                    className='py-2 hover:no-underline outline-none [line-break:anywhere]'
                  >
                    {(step.data.name as string) ? step.data.name as string : `${step.id}`}
                  </AccordionTrigger>
                  <AccordionContent className='flex flex-col gap-2'>
                    <div className='flex flex-col gap-1'>
                      <h4 className='text-[10px] text-muted-foreground'>name</h4>
                      <div
                        className='px-[2px]'
                      >
                        <Input
                          className='h-7 px-2 text-xs rounded-sm'
                          defaultValue={step.data.name as string}
                        />
                      </div>
                    </div>
                    <div className='flex flex-col gap-1'>
                      <h4 className='text-[10px] text-muted-foreground'>run</h4>
                      <div
                        className='px-[2px]'
                      >
                        <Textarea
                          className='px-2 text-xs rounded-sm resize-none'
                          defaultValue={step.data.run as string}
                        />
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </ScrollArea>
    </div>
  )
}