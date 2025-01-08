"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { CraeteNodeButton } from "@/features/flow/components/menu/create-node-button";
import { onOptions } from "@/features/flow/config/options/on-options";
import { runsOnOptions } from "@/features/flow/config/options/runs-options";
import { useHandleNode } from "@/features/flow/hooks/useHandleNode";

export const SidebarMenu = () => {
  const { workflows, jobs, steps, onUpdateNode } = useHandleNode();

  return (
    <div className="flex flex-col gap-4">
      <div>
        <div className="flex items-center justify-between">
          <p className="text-gray-500 text-xs">ワークフロー</p>
          <CraeteNodeButton type="workflow" />
        </div>
        <Accordion type="single" collapsible>
          {workflows.map((workflow) => (
            <AccordionItem value={workflow.id} key={workflow.id}>
              <AccordionTrigger className="py-2 hover:no-underline outline-none">
                {workflow.data.name ? workflow.data.name : `${workflow.id}`}
              </AccordionTrigger>
              <AccordionContent className="flex flex-col gap-2">
                <div className="flex flex-col gap-1">
                  <h4 className="text-[10px] text-muted-foreground">name</h4>
                  <div className="px-[2px]">
                    <Input
                      className="h-7 px-2 text-xs rounded-sm"
                      defaultValue={workflow.data.name}
                      onChange={(e) =>
                        onUpdateNode(workflow.id, {
                          name: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <h4 className="text-[10px] text-muted-foreground">on</h4>
                  <div className="px-[2px]">
                    <Select
                      defaultValue={Object.keys(workflow.data.on)[0]}
                      onValueChange={(value) =>
                        onUpdateNode(workflow.id, {
                          on: {
                            [value]: {},
                          },
                        })
                      }
                    >
                      <SelectTrigger className="rounded-sm text-xs placeholder:!text-gray-400">
                        <SelectValue placeholder="イベントを選択" />
                      </SelectTrigger>
                      <SelectContent>
                        {onOptions.map((on) => (
                          <SelectItem
                            value={on.value}
                            key={on.value}
                            className="text-xs"
                          >
                            {on.label}
                          </SelectItem>
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
        <div className="flex items-center justify-between">
          <p className="text-gray-500 text-xs">ジョブ</p>
          <CraeteNodeButton type="job" />
        </div>
        <Accordion type="single" collapsible>
          {jobs.map((job) => (
            <AccordionItem value={job.id} key={job.id}>
              <AccordionTrigger className="py-2 hover:no-underline outline-none">
                {job.data.name ? job.data.name : `${job.id}`}
              </AccordionTrigger>
              <AccordionContent className="flex flex-col gap-2">
                <div className="flex flex-col gap-1">
                  <h4 className="text-[10px] text-muted-foreground">name</h4>
                  <div className="px-[2px]">
                    <Input
                      className="h-7 px-2 text-xs rounded-sm"
                      defaultValue={job.data.name}
                      onChange={(e) =>
                        onUpdateNode(job.id, {
                          name: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <h4 className="text-[10px] text-muted-foreground">runs-on</h4>
                  <div className="px-[2px]">
                    <Select
                      defaultValue={job.data["runs-on"]}
                      onValueChange={(value) =>
                        onUpdateNode(job.id, {
                          "runs-on": value,
                        })
                      }
                    >
                      <SelectTrigger className="rounded-sm text-xs placeholder:!text-gray-400">
                        <SelectValue placeholder="実行環境を選択" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.keys(runsOnOptions).map((os) => (
                          <SelectGroup key={os}>
                            <SelectLabel className="text-sm">{os}</SelectLabel>
                            {runsOnOptions[
                              os as "ubuntu" | "windows" | "mac"
                            ].map((option) => (
                              <SelectItem
                                key={option.value}
                                value={option.value}
                                className="text-gray-500 text-xs"
                              >
                                {option.label}
                              </SelectItem>
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
        <div className="flex items-center justify-between">
          <p className="text-gray-500 text-xs">ステップ</p>
          <CraeteNodeButton type="step" />
        </div>
        <Accordion type="single" collapsible>
          {steps.map((step) => (
            <AccordionItem value={step.id} key={step.id}>
              <AccordionTrigger className="py-2 hover:no-underline outline-none [line-break:anywhere]">
                {step.data.name ? step.data.name : `${step.id}`}
              </AccordionTrigger>
              <AccordionContent className="flex flex-col gap-2">
                <div className="flex flex-col gap-1">
                  <h4 className="text-[10px] text-muted-foreground">name</h4>
                  <div className="px-[2px]">
                    <Input
                      className="h-7 px-2 text-xs rounded-sm"
                      defaultValue={step.data.name}
                      onChange={(e) =>
                        onUpdateNode(step.id, {
                          name: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <h4 className="text-[10px] text-muted-foreground">run</h4>
                  <div className="px-[2px]">
                    <Textarea
                      className="px-2 text-xs rounded-sm resize-none"
                      defaultValue={step.data.run}
                      onChange={(e) =>
                        onUpdateNode(step.id, {
                          run: e.target.value,
                        })
                      }
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
  );
};
