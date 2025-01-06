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
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select"
import { Node, NodeProps } from "@xyflow/react"
import { WorkflowData } from "@/features/flow/types/workflow-data"
import { StepData } from "@/features/flow/types/step-data"
import { JobData } from "@/features/flow/types/job-data"

const onOptions = [
  {
    label: "workflow_dispatch",
    value: "workflow_dispatch",
  }
]
const runsOnOptions: Record<"ubuntu" | "windows" | "mac", { label: string, value: string }[]> = {
  "ubuntu": [
    {
      label: "ubuntu-latest",
      value: "ubuntu-latest"
    },
    
    {
      label: "ubuntu-24.04",
      value: "ubuntu-24.04"
    },
    {
      label: "ubuntu-22.04",
      value: "ubuntu-22.04"
    },
    {
      label: "ubuntu-20.04",
      value: "ubuntu-20.04"
    }
  ],
  "windows": [
    {
      label: "windows-latest",
      value: "windows-latest"
    },  
    {
      label: "windows-2022",
      value: "windows-2022"
    },
    {
      label: "windows-2019",
      value: "windows-2019"
    }
  ],
  "mac": [
    {
      label: "macos-13",
      value: "macos-13"
    },
    {
      label: "macos-latest",
      value: "macos-latest"
    },
    {
      label: "macos-14",
      value: "macos-14"
    }
  ]
}

export const Sidebar = () => {
  const [nodes, setNodes] = useAtom(nodesAtom);

  const workflows = useMemo(() => {
    return nodes.filter((v) => v.type === "workflow")
  }, [nodes]) as Node<WorkflowData>[];

  const jobs = useMemo(() => {
    return nodes.filter((v) => v.type === "job")
  }, [nodes]) as Node<JobData>[];
  
  const steps = useMemo(() => {
    return nodes.filter((v) => v.type === "step")
  }, [nodes]) as Node<StepData>[];

  const onCreateNode = (type: "workflow" | "job" | "step") => {
    if (type === "workflow" && workflows.length) return;
    if (type === "job" && jobs.length >= 20) return;

    switch(type) {
      case "workflow":
        setNodes([...nodes, {
          id: uuidv4(),
          position: {
            x: 0,
            y: workflows.length * 200,
          },
          data: {
            name: `workflow${workflows.length + 1}`,
            on: {
              "workflow_dispatch": {}
            }
          },
          type: type
        }]);
        break;

      case "job":
        setNodes([...nodes, {
          id: uuidv4(),
          position: {
            x: 400,
            y: jobs.length * 200,
          },
          data: {
            name: `job${jobs.length + 1}`,
            "runs-on": "ubuntu-latest",
            job_id: `job_${jobs.length + 1}`,
          },
          type: type
        }]);
        break;

      default:
        setNodes([...nodes, {
          id: uuidv4(),
          position: {
            x: 800,
            y: steps.length * 200,
          },
          data: {
            run: "echo 'Hello World'"
          },
          type: type
        }]);
        break;
    }
  }

  const onUpdateNode = (id: string, newData: Partial<Node<WorkflowData | JobData | StepData>["data"]>) => {
    setNodes((prevNodes) => {
      return prevNodes.map((prevNode) => {
        if (prevNode.id === id) {
          return {
            ...prevNode,
            data: {
              ...prevNode.data,
              ...newData
            }
          }
        }
        return prevNode
      })
    })
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
                    {workflow.data.name ? workflow.data.name : `${workflow.id}`}
                  </AccordionTrigger>
                  <AccordionContent className='flex flex-col gap-2'>
                    <div className='flex flex-col gap-1'>
                      <h4 className='text-[10px] text-muted-foreground'>name</h4>
                      <div
                        className='px-[2px]'
                      >
                        <Input
                          className='h-7 px-2 text-xs rounded-sm'
                          defaultValue={workflow.data.name}
                          onChange={(e) => onUpdateNode(workflow.id, {
                            name: e.target.value
                          })}
                        />
                      </div>
                    </div>
                    <div className='flex flex-col gap-1'>
                      <h4 className='text-[10px] text-muted-foreground'>on</h4>
                      <div
                        className='px-[2px]'
                        >
                        <Select 
                          defaultValue={Object.keys(workflow.data.on)[0]}
                          onValueChange={(value) => onUpdateNode(workflow.id, {
                            on: {
                              [value]: {}
                            }
                          })}
                          >
                          <SelectTrigger className="rounded-sm text-xs placeholder:!text-gray-400">
                            <SelectValue placeholder="イベントを選択" />
                          </SelectTrigger>
                          <SelectContent>
                            {onOptions.map((on) => (
                              <SelectItem value={on.value} key={on.value} className="text-xs">{on.label}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
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
                    {(job.data.name) ? job.data.name : `${job.id}`}
                  </AccordionTrigger>
                  <AccordionContent className='flex flex-col gap-2'>
                    <div className='flex flex-col gap-1'>
                      <h4 className='text-[10px] text-muted-foreground'>name</h4>
                      <div
                        className='px-[2px]'
                      >
                        <Input
                          className='h-7 px-2 text-xs rounded-sm'
                          defaultValue={job.data.name}
                          onChange={(e) => onUpdateNode(job.id, {
                            name: e.target.value
                          })}
                        />
                      </div>
                    </div>
                    <div className='flex flex-col gap-1'>
                      <h4 className='text-[10px] text-muted-foreground'>runs-on</h4>
                      <div
                        className='px-[2px]'
                      >
                        <Select 
                          defaultValue={job.data["runs-on"]}
                          onValueChange={(value) => onUpdateNode(job.id, {
                            "runs-on": value
                          })}
                          >
                          <SelectTrigger className="rounded-sm text-xs placeholder:!text-gray-400">
                            <SelectValue placeholder="実行環境を選択" />
                          </SelectTrigger>
                          <SelectContent>
                            {Object.keys(runsOnOptions).map((os) => (
                              <SelectGroup key={os}>
                                <SelectLabel className="text-sm">{os}</SelectLabel>
                                {runsOnOptions[os as "ubuntu" | "windows" | "mac"].map((option) => (
                                  <SelectItem 
                                    key={option.value} 
                                    value={option.value}
                                    className="text-gray-500 text-xs"
                                    >{option.label}</SelectItem>
                                ))}
                              </SelectGroup>
                            ))}
                          </SelectContent>
                        </Select>
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
                    {(step.data.name) ? step.data.name : `${step.id}`}
                  </AccordionTrigger>
                  <AccordionContent className='flex flex-col gap-2'>
                    <div className='flex flex-col gap-1'>
                      <h4 className='text-[10px] text-muted-foreground'>name</h4>
                      <div
                        className='px-[2px]'
                      >
                        <Input
                          className='h-7 px-2 text-xs rounded-sm'
                          defaultValue={step.data.name}
                          onChange={(e) => onUpdateNode(step.id, {
                            name: e.target.value
                          })}
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
                          defaultValue={step.data.run}
                          onChange={(e) => onUpdateNode(step.id, {
                            run: e.target.value
                          })}
                          rows={5}
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