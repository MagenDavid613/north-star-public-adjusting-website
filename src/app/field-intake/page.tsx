"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

// ---------- Data model (ported 1:1 from the original prototype's JS) ----------

const ROOM_TYPES = [
  "Entry / foyer","Living room","Family room","Great room","Dining room","Breakfast nook",
  "Kitchen","Pantry","Laundry / utility room","Primary bedroom","Bedroom","Guest bedroom",
  "Nursery","Primary bathroom","Full bathroom","Half bathroom / powder room",
  "Jack-and-Jill bathroom","Walk-in closet","Closet","Hallway","Stairwell / landing",
  "Home office","Den / study","Playroom / bonus room","Media / theater room",
  "Florida room / sunroom","Screened porch","Lanai","Enclosed porch","Balcony","Garage",
  "Garage storage","Attic","Storage room","Mechanical / utility room","Pool house",
  "Shed / workshop","Office / reception","Conference room","Retail / sales floor",
  "Restroom","Other (specify)",
]

const EXTERIOR_TYPES = [
  "Roof","Fence","Siding / exterior walls","Soffit / fascia","Gutters / downspouts",
  "Exterior windows","Exterior doors","Pool enclosure / screen cage","Lanai / patio",
  "Deck / balcony","Carport","Driveway / pavers","Detached shed","Garage exterior",
  "Outdoor equipment","Other (specify)",
]

const COMMON_COMPONENTS = [
  "Ceiling","Drywall / interior walls","Flooring","Subfloor","Baseboards / trim",
  "Crown molding","Windows","Window framing / sill","Skylight","Doors / doorframes",
  "Light fixtures","Electrical outlets / switches","Insulation","HVAC vents / registers",
  "Plumbing supply / drain","Built-in shelving","Furniture / contents","Other (specify)",
]

const COMPONENT_OVERRIDES: Record<string, string[]> = {
  "Kitchen": ["Upper cabinets","Lower cabinets","Cabinet doors / drawers","Cabinet toe kicks","Kitchen island","Countertops","Backsplash","Sink","Faucet / fixtures","Range / oven","Range hood","Refrigerator","Dishwasher","Microwave","Pantry shelving"],
  "Pantry": ["Shelving","Cabinets","Pantry door"],
  "Primary bathroom": ["Vanity / vanity cabinets","Sink / countertop","Faucet","Toilet","Tub","Shower / shower pan","Tile / grout","Shower glass / enclosure","Mirror","Exhaust fan"],
  "Full bathroom": ["Vanity / vanity cabinets","Sink / countertop","Faucet","Toilet","Tub","Shower / shower pan","Tile / grout","Shower glass / enclosure","Mirror","Exhaust fan"],
  "Half bathroom / powder room": ["Vanity","Sink / countertop","Toilet","Mirror","Exhaust fan"],
  "Jack-and-Jill bathroom": ["Vanity / vanity cabinets","Sink / countertop","Toilet","Tub","Shower / shower pan","Tile / grout"],
  "Laundry / utility room": ["Washer","Dryer","Utility sink","Cabinets","Laundry hookups","Water heater"],
  "Garage": ["Garage door","Garage door opener","Garage ceiling","Storage cabinets","Electrical panel"],
  "Lanai": ["Screen panels","Screen enclosure frame","Patio slab / pavers","Roof / cover","Outdoor fixtures"],
  "Screened porch": ["Screen panels","Screen enclosure frame","Porch railing","Roof / cover"],
  "Florida room / sunroom": ["Sliding glass doors","Window panels","Screening","Flooring"],
  "Pool house": ["Pool equipment","Electrical equipment","Storage cabinets"],
  "Roof": ["Roof covering","Underlayment","Decking","Ridge / hip cap","Flashing","Skylight","Roof vents"],
  "Fence": ["Fence panels","Posts","Gate","Footings"],
  "Pool enclosure / screen cage": ["Screen panels","Aluminum framing","Fasteners","Doors"],
  "Siding / exterior walls": ["Wall covering","Stucco","Siding","Paint / finish","Sheathing"],
  "Soffit / fascia": ["Soffit panels","Fascia","Drip edge"],
  "Gutters / downspouts": ["Gutter sections","Downspouts","Hangers / brackets"],
  "Driveway / pavers": ["Concrete slab","Pavers","Edging"],
}

function compOptions(type: string): string[] {
  return [...new Set([...COMMON_COMPONENTS, ...(COMPONENT_OVERRIDES[type] ?? [])])].sort((a, b) =>
    a.localeCompare(b)
  )
}

const LOSS_TYPES = [
  "Hurricane / wind","Water / plumbing","Roof leak","Flood","Fire / smoke",
  "Lightning / electrical","Tree / impact","Vandalism","Other",
]

let seq = 0
const uid = () => `id-${Date.now().toString(36)}-${(++seq).toString(36)}`

type RoomComponent = { id: string; type: string; customType: string; label: string; condition: string; notes: string }
type Room = { id: string; kind: "room" | "exterior"; type: string; customType: string; label: string; current: string; preexisting: string; mitigationNote: string; components: RoomComponent[] }
type Unit = { id: string; name: string; rooms: Room[] }
type Building = { id: string; name: string; rooms: Room[]; units: Unit[]; exteriors: Room[] }
type LinkedLocation = { id: string; kind: "room" | "exterior"; type: string; customType: string; label: string; notes: string }

const makeBuilding = (name = "Main structure"): Building => ({ id: uid(), name, rooms: [], units: [], exteriors: [] })
const makeRoom = (kind: "room" | "exterior" = "room"): Room => ({ id: uid(), kind, type: "", customType: "", label: "", current: "", preexisting: "", mitigationNote: "", components: [] })
const makeComp = (): RoomComponent => ({ id: uid(), type: "", customType: "", label: "", condition: "Current loss", notes: "" })
const makeUnit = (): Unit => ({ id: uid(), name: "", rooms: [] })
const makeLinkedLocation = (kind: "room" | "exterior"): LinkedLocation => ({ id: uid(), kind, type: "", customType: "", label: "", notes: "" })

// ---------- Validation: this is the actual point of the rebuild — required
// fields can't be silently skipped, and emails must be well-formed before
// the form lets you move past step 1. ----------

const emailOptional = z
  .string()
  .trim()
  .refine((v) => v === "" || z.string().email().safeParse(v).success, "Enter a valid email address")

const step1Schema = z.object({
  intake_date: z.string().min(1, "Date is required"),
  nspa_rep: z.string().trim().min(1, "Representative name is required"),
  rep_cell: z.string().trim().min(7, "Enter a valid cell number"),
  lead_source: z.enum(["own", "office"], { message: "Select a lead source" }),
  insured1: z.string().trim().min(1, "Named insured 1 is required"),
  insured1_cell: z.string().trim().min(7, "Enter a valid cell number"),
  insured1_email: emailOptional,
  insured2: z.string().trim().optional(),
  insured2_cell: z.string().trim().optional(),
  insured2_email: emailOptional,
  damage_address: z.string().trim().min(1, "Damaged property address is required"),
  mailing_address_is_different: z.boolean().optional(),
  mailing_address: z.string().trim().optional(),
})

const step2Schema = z.object({
  loss_type: z.string().trim().min(1, "Loss type is required"),
  date_loss: z.string().min(1, "Date of loss is required"),
  claim_situation: z.enum(["New", "Existing", "Reopened", "Supplemental"], {
    message: "Select the claim situation",
  }),
  initial_payment: z.string().trim().optional(),
  insurance_company: z.string().trim().optional(),
  policy_number: z.string().trim().optional(),
  claim_number: z.string().trim().optional(),
  prior_claim: z.enum(["No", "Yes"], { message: "Select yes or no" }),
  prior_claim_explain: z.string().trim().optional(),
  repairs: z.enum(["No", "Yes"], { message: "Select yes or no" }),
  repairs_explain: z.string().trim().optional(),
  contents: z.enum(["No", "Yes"], { message: "Select yes or no" }),
  contents_explain: z.string().trim().optional(),
})

const fullSchema = step1Schema.merge(step2Schema)
type FormValues = z.input<typeof fullSchema>

const defaultValues: FormValues = {
  intake_date: new Date().toISOString().slice(0, 10),
  nspa_rep: "",
  rep_cell: "",
  lead_source: undefined as unknown as "own" | "office",
  insured1: "",
  insured1_cell: "",
  insured1_email: "",
  insured2: "",
  insured2_cell: "",
  insured2_email: "",
  damage_address: "",
  mailing_address_is_different: false,
  mailing_address: "",
  loss_type: "",
  date_loss: "",
  claim_situation: undefined as unknown as "New",
  initial_payment: "",
  insurance_company: "",
  policy_number: "",
  claim_number: "",
  prior_claim: undefined as unknown as "No",
  prior_claim_explain: "",
  repairs: undefined as unknown as "No",
  repairs_explain: "",
  contents: undefined as unknown as "No",
  contents_explain: "",
}

const STEP1_FIELDS = Object.keys(step1Schema.shape) as (keyof FormValues)[]
const STEP2_FIELDS = Object.keys(step2Schema.shape) as (keyof FormValues)[]

export default function FieldIntakePage() {
  const [step, setStep] = useState(0)
  const [buildings, setBuildings] = useState<Building[]>([makeBuilding()])
  const [mitigation, setMitigation] = useState<string[]>([])
  const [repairLocations, setRepairLocations] = useState<LinkedLocation[]>([])
  const [contentsLocations, setContentsLocations] = useState<LinkedLocation[]>([])
  const [submitStatus, setSubmitStatus] = useState<{ kind: "idle" | "ok" | "error"; message: string }>({
    kind: "idle",
    message: "",
  })
  const [submitting, setSubmitting] = useState(false)

  // Standalone page — override the marketing site's cream body background
  // directly rather than relying on a child div to fully cover it.
  useEffect(() => {
    const prev = document.body.style.background
    document.body.style.background = "#ffffff"
    return () => {
      document.body.style.background = prev
    }
  }, [])

  const form = useForm<FormValues>({
    resolver: zodResolver(fullSchema),
    defaultValues,
    mode: "onBlur",
  })

  // Validates every step strictly between the current one and the target
  // before jumping forward, so clicking a step-nav button ahead (not just
  // the Continue button) can't skip required fields. Moving backward is
  // always allowed, no validation needed.
  async function goToStep(target: number) {
    const clamped = Math.max(0, Math.min(target, 2))
    for (let s = step; s < clamped; s++) {
      if (s === 0) {
        const ok = await form.trigger(STEP1_FIELDS)
        if (!ok) {
          setStep(0)
          return
        }
      }
      if (s === 1) {
        const ok = await form.trigger(STEP2_FIELDS)
        if (!ok) {
          setStep(1)
          return
        }
      }
    }
    setStep(clamped)
  }

  function goNext() {
    return goToStep(step + 1)
  }

  function goBack() {
    setStep((s) => Math.max(s - 1, 0))
  }

  function updateRoom(roomId: string, patch: Partial<Room>) {
    setBuildings((bs) =>
      bs.map((b) => ({
        ...b,
        rooms: b.rooms.map((r) => (r.id === roomId ? { ...r, ...patch } : r)),
        exteriors: b.exteriors.map((r) => (r.id === roomId ? { ...r, ...patch } : r)),
        units: b.units.map((u) => ({
          ...u,
          rooms: u.rooms.map((r) => (r.id === roomId ? { ...r, ...patch } : r)),
        })),
      }))
    )
  }

  function updateComponent(roomId: string, compId: string, patch: Partial<RoomComponent>) {
    const patchRoom = (r: Room): Room =>
      r.id === roomId
        ? { ...r, components: r.components.map((c) => (c.id === compId ? { ...c, ...patch } : c)) }
        : r
    setBuildings((bs) =>
      bs.map((b) => ({
        ...b,
        rooms: b.rooms.map(patchRoom),
        exteriors: b.exteriors.map(patchRoom),
        units: b.units.map((u) => ({ ...u, rooms: u.rooms.map(patchRoom) })),
      }))
    )
  }

  function addRoom(buildingId: string) {
    setBuildings((bs) => bs.map((b) => (b.id === buildingId ? { ...b, rooms: [...b.rooms, makeRoom()] } : b)))
  }
  function addExterior(buildingId: string) {
    setBuildings((bs) =>
      bs.map((b) => (b.id === buildingId ? { ...b, exteriors: [...b.exteriors, makeRoom("exterior")] } : b))
    )
  }
  function addUnit(buildingId: string) {
    setBuildings((bs) => bs.map((b) => (b.id === buildingId ? { ...b, units: [...b.units, makeUnit()] } : b)))
  }
  function addUnitRoom(unitId: string) {
    setBuildings((bs) =>
      bs.map((b) => ({ ...b, units: b.units.map((u) => (u.id === unitId ? { ...u, rooms: [...u.rooms, makeRoom()] } : u)) }))
    )
  }
  function addComponent(roomId: string) {
    updateRoomComponents(roomId, (comps) => [...comps, makeComp()])
  }
  function updateRoomComponents(roomId: string, fn: (comps: RoomComponent[]) => RoomComponent[]) {
    const patchRoom = (r: Room): Room => (r.id === roomId ? { ...r, components: fn(r.components) } : r)
    setBuildings((bs) =>
      bs.map((b) => ({
        ...b,
        rooms: b.rooms.map(patchRoom),
        exteriors: b.exteriors.map(patchRoom),
        units: b.units.map((u) => ({ ...u, rooms: u.rooms.map(patchRoom) })),
      }))
    )
  }
  function removeComponent(roomId: string, compId: string) {
    updateRoomComponents(roomId, (comps) => comps.filter((c) => c.id !== compId))
  }
  function removeRoom(roomId: string) {
    setBuildings((bs) =>
      bs.map((b) => ({
        ...b,
        rooms: b.rooms.filter((r) => r.id !== roomId),
        exteriors: b.exteriors.filter((r) => r.id !== roomId),
        units: b.units.map((u) => ({ ...u, rooms: u.rooms.filter((r) => r.id !== roomId) })),
      }))
    )
  }
  function removeUnit(unitId: string) {
    setBuildings((bs) => bs.map((b) => ({ ...b, units: b.units.filter((u) => u.id !== unitId) })))
  }
  function removeBuilding(buildingId: string) {
    if (buildings.length === 1) {
      alert("Keep at least one structure. You can rename it.")
      return
    }
    setBuildings((bs) => bs.filter((b) => b.id !== buildingId))
  }
  function addBuilding() {
    setBuildings((bs) => [...bs, makeBuilding(`Building / structure ${bs.length + 1}`)])
  }

  const allRooms = buildings.flatMap((b) => [...b.rooms, ...b.exteriors, ...b.units.flatMap((u) => u.rooms)])
  const totalComponents = allRooms.reduce((n, r) => n + r.components.length, 0)

  function toggleMitigation(value: string, checked: boolean) {
    setMitigation((prev) => {
      if (value === "None") return checked ? ["None"] : []
      const withoutNone = prev.filter((v) => v !== "None")
      return checked ? [...withoutNone, value] : withoutNone.filter((v) => v !== value)
    })
  }

  function buildPayload() {
    const intake = form.getValues()
    return {
      document_type: "field_client_intake",
      format_version: "react-shadcn-1.0",
      notice: "Not a contract, estimate, carrier filing, or coverage determination",
      intake: { ...intake, mitigation },
      buildings,
      prior_repairs_locations: intake.repairs === "Yes" ? repairLocations : [],
      contents_damage_locations: intake.contents === "Yes" ? contentsLocations : [],
    }
  }

  async function handleSubmit() {
    setSubmitting(true)
    setSubmitStatus({ kind: "idle", message: "" })
    try {
      const res = await fetch("/api/intake/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(buildPayload()),
      })
      const data = await res.json()
      if (!res.ok || !data.success) throw new Error(data.error || "Submit failed")
      setSubmitStatus({ kind: "ok", message: `Submitted — claim ${data.claimNumber} created in the office system.` })
    } catch (err) {
      setSubmitStatus({
        kind: "error",
        message: `Submit failed: ${err instanceof Error ? err.message : String(err)}`,
      })
    } finally {
      setSubmitting(false)
    }
  }

  const repairs = form.watch("repairs")
  const contents = form.watch("contents")
  const mailDifferent = form.watch("mailing_address_is_different")

  return (
    <div className="min-h-screen bg-white">
    <div className="mx-auto max-w-4xl px-4 py-8 pb-28">
      <header className="mb-6 flex items-center gap-4 border-b border-brand-100 pb-6">
        <Image src="/North_Star_PA_logo_main.png" alt="North Star Public Adjusting" width={820} height={314} className="h-20 w-auto object-contain" priority />
        <div>
          <h1 className="text-2xl font-black text-ink">Field Client Intake</h1>
        </div>
      </header>

      <nav className="mb-6 grid grid-cols-3 gap-2">
        {["Client & claim", "Damage areas", "Review / submit"].map((label, i) => (
          <button
            key={label}
            type="button"
            onClick={() => goToStep(i)}
            className={`rounded-[7px] border px-3 py-3 text-sm font-extrabold ${
              step === i ? "border-brand-500 bg-brand-500 text-white" : "border-brand-100 bg-white text-ink hover:bg-brand-50"
            }`}
          >
            {i + 1}. {label}
          </button>
        ))}
      </nav>

      <Form {...form}>
        <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
          {step === 0 && (
            <>
              <section className="border-t border-brand-100 pt-6 first:border-t-0 first:pt-0">
                <div className="mb-4">
                  <h2 className="font-display text-xl font-bold text-ink">Adjuster & client</h2>
                  <p className="mt-1 text-sm text-ink-muted">Field sign-up visit. No contract signatures or office workflow on this intake.</p>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <FormField control={form.control} name="intake_date" render={({ field }) => (
                    <FormItem><FormLabel>Date</FormLabel><FormControl><Input type="date" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="nspa_rep" render={({ field }) => (
                    <FormItem><FormLabel>NSPA representative / field adjuster</FormLabel><FormControl><Input placeholder="Full name" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="rep_cell" render={({ field }) => (
                    <FormItem><FormLabel>Adjuster&apos;s cell</FormLabel><FormControl><Input type="tel" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="lead_source" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Lead source</FormLabel>
                      <FormControl>
                        <RadioGroup onValueChange={field.onChange} value={field.value ?? ""} className="flex gap-4 pt-2">
                          <label className="flex items-center gap-2 text-sm"><RadioGroupItem value="own" />Own lead</label>
                          <label className="flex items-center gap-2 text-sm"><RadioGroupItem value="office" />Office lead</label>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />

                  <div className="col-span-full"><Separator className="my-1" /><p className="text-sm font-bold text-brand-500">Named insured 1</p></div>
                  <FormField control={form.control} name="insured1" render={({ field }) => (
                    <FormItem className="col-span-full"><FormLabel>Name exactly as on policy</FormLabel><FormControl><Input placeholder="Named insured 1" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="insured1_cell" render={({ field }) => (
                    <FormItem><FormLabel>Cell</FormLabel><FormControl><Input type="tel" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="insured1_email" render={({ field }) => (
                    <FormItem><FormLabel>Email</FormLabel><FormControl><Input type="email" placeholder="name@example.com" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />

                  <div className="col-span-full"><Separator className="my-1" /><p className="text-sm font-bold text-brand-500">Named insured 2 <span className="font-normal text-muted-foreground">(if listed on policy)</span></p></div>
                  <FormField control={form.control} name="insured2" render={({ field }) => (
                    <FormItem className="col-span-full"><FormLabel>Name exactly as on policy</FormLabel><FormControl><Input placeholder="Named insured 2, if any" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="insured2_cell" render={({ field }) => (
                    <FormItem><FormLabel>Cell</FormLabel><FormControl><Input type="tel" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="insured2_email" render={({ field }) => (
                    <FormItem><FormLabel>Email</FormLabel><FormControl><Input type="email" placeholder="name@example.com" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />

                  <FormField control={form.control} name="damage_address" render={({ field }) => (
                    <FormItem className="col-span-full"><FormLabel>Damaged property address</FormLabel><FormControl><Input placeholder="Street, city, state, ZIP; unit # if applicable" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="mailing_address_is_different" render={({ field }) => (
                    <FormItem className="col-span-full flex flex-row items-center gap-2 space-y-0">
                      <FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                      <FormLabel className="font-normal">Client&apos;s mailing address is different</FormLabel>
                    </FormItem>
                  )} />
                  {mailDifferent && (
                    <FormField control={form.control} name="mailing_address" render={({ field }) => (
                      <FormItem className="col-span-full"><FormLabel>Mailing address</FormLabel><FormControl><Input placeholder="Street / PO Box, city, state, ZIP" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                  )}
                </div>
              </section>

              <section className="border-t border-brand-100 pt-6 first:border-t-0 first:pt-0">
                <div className="mb-4">
                  <h2 className="font-display text-xl font-bold text-ink">Loss & insurance</h2>
                  <p className="mt-1 text-sm text-ink-muted">Record what&apos;s known at sign-up. Leave claim number blank if the carrier hasn&apos;t assigned one.</p>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <FormField control={form.control} name="loss_type" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Loss type</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value ?? ""}>
                        <FormControl><SelectTrigger className="w-full"><SelectValue placeholder="Choose loss type" /></SelectTrigger></FormControl>
                        <SelectContent>{LOSS_TYPES.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="date_loss" render={({ field }) => (
                    <FormItem><FormLabel>Date of loss</FormLabel><FormControl><Input type="date" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="claim_situation" render={({ field }) => (
                    <FormItem className="col-span-full">
                      <FormLabel>Claim situation</FormLabel>
                      <FormControl>
                        <RadioGroup onValueChange={field.onChange} value={field.value ?? ""} className="flex flex-wrap gap-4 pt-2">
                          {["New", "Existing", "Reopened", "Supplemental"].map((v) => (
                            <label key={v} className="flex items-center gap-2 text-sm"><RadioGroupItem value={v} />{v}</label>
                          ))}
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="initial_payment" render={({ field }) => (
                    <FormItem><FormLabel>Initial payment amount (if any)</FormLabel><FormControl><Input placeholder="$" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="insurance_company" render={({ field }) => (
                    <FormItem><FormLabel>Insurance company</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="policy_number" render={({ field }) => (
                    <FormItem><FormLabel>Policy number</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="claim_number" render={({ field }) => (
                    <FormItem><FormLabel>Claim number (if any)</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                  )} />

                  <Separator className="col-span-full" />

                  <FormField control={form.control} name="prior_claim" render={({ field }) => (
                    <FormItem className="col-span-full">
                      <FormLabel>Any prior overlapping claim?</FormLabel>
                      <FormControl>
                        <RadioGroup onValueChange={field.onChange} value={field.value ?? ""} className="flex gap-4 pt-2">
                          <label className="flex items-center gap-2 text-sm"><RadioGroupItem value="No" />No</label>
                          <label className="flex items-center gap-2 text-sm"><RadioGroupItem value="Yes" />Yes</label>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="prior_claim_explain" render={({ field }) => (
                    <FormItem className="col-span-full"><FormLabel>If yes, explain</FormLabel><FormControl><Textarea rows={2} {...field} /></FormControl><FormMessage /></FormItem>
                  )} />

                  <FormField control={form.control} name="repairs" render={({ field }) => (
                    <FormItem className="col-span-full">
                      <FormLabel>Have any repairs been made?</FormLabel>
                      <FormControl>
                        <RadioGroup onValueChange={field.onChange} value={field.value ?? ""} className="flex gap-4 pt-2">
                          <label className="flex items-center gap-2 text-sm"><RadioGroupItem value="No" />No</label>
                          <label className="flex items-center gap-2 text-sm"><RadioGroupItem value="Yes" />Yes</label>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  {repairs === "Yes" && (
                    <div className="col-span-full space-y-3 rounded-lg border p-3">
                      <p className="text-xs text-muted-foreground">Select each interior room or exterior area where repairs were made.</p>
                      {repairLocations.map((loc) => (
                        <LocationFollowupEditor
                          key={loc.id}
                          loc={loc}
                          labelField="Repair details"
                          onChange={(patch) => setRepairLocations((ls) => ls.map((l) => (l.id === loc.id ? { ...l, ...patch } : l)))}
                          onRemove={() => setRepairLocations((ls) => ls.filter((l) => l.id !== loc.id))}
                        />
                      ))}
                      <div className="flex gap-2">
                        <Button type="button" variant="outline" size="sm" onClick={() => setRepairLocations((ls) => [...ls, makeLinkedLocation("room")])}>+ Interior room</Button>
                        <Button type="button" variant="outline" size="sm" onClick={() => setRepairLocations((ls) => [...ls, makeLinkedLocation("exterior")])}>+ Exterior area</Button>
                      </div>
                      <FormField control={form.control} name="repairs_explain" render={({ field }) => (
                        <FormItem><FormLabel>Other repair details (optional)</FormLabel><FormControl><Textarea rows={2} {...field} /></FormControl><FormMessage /></FormItem>
                      )} />
                    </div>
                  )}

                  <FormField control={form.control} name="contents" render={({ field }) => (
                    <FormItem className="col-span-full">
                      <FormLabel>Contents damaged?</FormLabel>
                      <FormControl>
                        <RadioGroup onValueChange={field.onChange} value={field.value ?? ""} className="flex gap-4 pt-2">
                          <label className="flex items-center gap-2 text-sm"><RadioGroupItem value="No" />No</label>
                          <label className="flex items-center gap-2 text-sm"><RadioGroupItem value="Yes" />Yes</label>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  {contents === "Yes" && (
                    <div className="col-span-full space-y-3 rounded-lg border p-3">
                      <p className="text-xs text-muted-foreground">Which room(s) contain damaged personal property or contents?</p>
                      {contentsLocations.map((loc) => (
                        <LocationFollowupEditor
                          key={loc.id}
                          loc={loc}
                          labelField="Damaged contents"
                          onChange={(patch) => setContentsLocations((ls) => ls.map((l) => (l.id === loc.id ? { ...l, ...patch } : l)))}
                          onRemove={() => setContentsLocations((ls) => ls.filter((l) => l.id !== loc.id))}
                        />
                      ))}
                      <Button type="button" variant="outline" size="sm" onClick={() => setContentsLocations((ls) => [...ls, makeLinkedLocation("room")])}>+ Add room with contents damage</Button>
                      <FormField control={form.control} name="contents_explain" render={({ field }) => (
                        <FormItem><FormLabel>Other contents details (optional)</FormLabel><FormControl><Textarea rows={2} {...field} /></FormControl><FormMessage /></FormItem>
                      )} />
                    </div>
                  )}
                </div>
              </section>
            </>
          )}

          {step === 1 && (
            <>
              <section className="border-t border-brand-100 pt-6 first:border-t-0 first:pt-0">
                <div className="mb-4">
                  <h2 className="font-display text-xl font-bold text-ink">Mitigation needed</h2>
                  <p className="mt-1 text-sm text-ink-muted">Keep the original four quick choices; list affected areas below.</p>
                </div>
                <div className="flex flex-wrap gap-4">
                  {["Tarp", "Dryout", "Mold", "None"].map((v) => (
                    <label key={v} className="flex items-center gap-2 text-sm">
                      <Checkbox checked={mitigation.includes(v)} onCheckedChange={(c) => toggleMitigation(v, !!c)} />
                      {v}
                    </label>
                  ))}
                </div>
              </section>

              <section className="border-t border-brand-100 pt-6 first:border-t-0 first:pt-0">
                <div className="mb-4 flex flex-row items-center justify-between">
                  <div>
                    <h2 className="font-display text-xl font-bold text-ink">Affected areas</h2>
                    <p className="mt-1 text-sm text-ink-muted">Add only damaged rooms, exterior locations or units.</p>
                  </div>
                  <Badge variant="secondary">{allRooms.filter((r) => r.kind === "room").length} rooms · {totalComponents} components</Badge>
                </div>
                <div className="space-y-4">
                  {buildings.map((b) => (
                    <BuildingEditor
                      key={b.id}
                      building={b}
                      onRename={(name) => setBuildings((bs) => bs.map((x) => (x.id === b.id ? { ...x, name } : x)))}
                      onAddRoom={() => addRoom(b.id)}
                      onAddExterior={() => addExterior(b.id)}
                      onAddUnit={() => addUnit(b.id)}
                      onAddUnitRoom={addUnitRoom}
                      onRemoveBuilding={() => removeBuilding(b.id)}
                      onRemoveUnit={removeUnit}
                      onUpdateRoom={updateRoom}
                      onRemoveRoom={removeRoom}
                      onAddComponent={addComponent}
                      onUpdateComponent={updateComponent}
                      onRemoveComponent={removeComponent}
                    />
                  ))}
                  <Button type="button" variant="outline" onClick={addBuilding}>+ Add another building / structure</Button>
                </div>
              </section>
            </>
          )}

          {step === 2 && (
            <section className="border-t border-brand-100 pt-6 first:border-t-0 first:pt-0">
              <div className="mb-4">
                <h2 className="font-display text-xl font-bold text-ink">Review & office handoff</h2>
                <p className="mt-1 text-sm text-ink-muted">Confirm everything below, then submit to the office.</p>
              </div>
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">{buildings.length} structures</Badge>
                  <Badge variant="secondary">{buildings.reduce((n, b) => n + b.units.length, 0)} units</Badge>
                  <Badge variant="secondary">{allRooms.length} rooms / areas</Badge>
                  <Badge variant="secondary">{totalComponents} components</Badge>
                </div>
                <ReviewSummary form={form} mitigation={mitigation} buildings={buildings} repairLocations={repairLocations} contentsLocations={contentsLocations} />
                <div className="flex gap-2 pt-2">
                  <Button type="button" onClick={handleSubmit} disabled={submitting}>
                    {submitting ? "Submitting…" : "Submit to office"}
                  </Button>
                </div>
                {submitStatus.kind !== "idle" && (
                  <p className={`text-sm ${submitStatus.kind === "ok" ? "text-green-700" : "text-red-700"}`}>{submitStatus.message}</p>
                )}
              </div>
            </section>
          )}
        </form>
      </Form>

      <div className="fixed inset-x-0 bottom-0 flex justify-center border-t border-brand-100 bg-white py-3">
        <div className="flex w-full max-w-4xl items-center justify-between px-4">
          <Button type="button" variant="outline" disabled={step === 0} onClick={goBack}>Back</Button>
          <span className="text-xs text-muted-foreground">North Star Public Adjusting · Field Client Intake</span>
          {step < 2 ? (
            <Button type="button" onClick={goNext}>Continue</Button>
          ) : (
            <Button type="button" variant="outline" onClick={() => setStep(0)}>Back to start</Button>
          )}
        </div>
      </div>
    </div>
    </div>
  )
}

function LocationFollowupEditor({
  loc,
  labelField,
  onChange,
  onRemove,
}: {
  loc: LinkedLocation
  labelField: string
  onChange: (patch: Partial<LinkedLocation>) => void
  onRemove: () => void
}) {
  const types = loc.kind === "exterior" ? EXTERIOR_TYPES : ROOM_TYPES
  return (
    <div className="rounded-lg border border-brand-100 bg-white p-3">
      <div className="mb-2 flex items-center justify-between">
        <strong className="text-xs text-brand-500">{loc.kind === "exterior" ? "Exterior area" : "Interior room"}</strong>
        <Button type="button" variant="ghost" size="sm" className="text-red-700" onClick={onRemove}>Remove</Button>
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <Select value={loc.type} onValueChange={(v: string | null) => v && onChange({ type: v })}>
          <SelectTrigger className="w-full"><SelectValue placeholder={`Select ${loc.kind === "exterior" ? "exterior area" : "room"}`} /></SelectTrigger>
          <SelectContent>{types.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
        </Select>
        <Input placeholder="e.g. Bedroom 2, north roof slope" value={loc.label} onChange={(e) => onChange({ label: e.target.value })} />
        {loc.type === "Other (specify)" && (
          <Input className="sm:col-span-2" placeholder="Specify other area" value={loc.customType} onChange={(e) => onChange({ customType: e.target.value })} />
        )}
        <Textarea className="sm:col-span-2" rows={2} placeholder={`${labelField}: what was affected?`} value={loc.notes} onChange={(e) => onChange({ notes: e.target.value })} />
      </div>
    </div>
  )
}

function RoomEditor({
  room,
  onUpdate,
  onRemove,
  onAddComponent,
  onUpdateComponent,
  onRemoveComponent,
}: {
  room: Room
  onUpdate: (patch: Partial<Room>) => void
  onRemove: () => void
  onAddComponent: () => void
  onUpdateComponent: (compId: string, patch: Partial<RoomComponent>) => void
  onRemoveComponent: (compId: string) => void
}) {
  const isExterior = room.kind === "exterior"
  const types = isExterior ? EXTERIOR_TYPES : ROOM_TYPES
  const typeName = room.type === "Other (specify)" ? room.customType || "Other" : room.type
  const title = typeName || (isExterior ? "Exterior area" : "New room")
  const options = compOptions(room.type)

  return (
    <div className="rounded-lg border border-brand-100 bg-white">
      <div className="flex items-center justify-between border-b border-brand-100 px-3 py-2">
        <span className="text-sm font-semibold text-brand-500">{title}{room.label ? ` · ${room.label}` : ""}</span>
        <span className="text-xs text-muted-foreground">{room.components.length} component{room.components.length === 1 ? "" : "s"}</span>
      </div>
      <div className="space-y-3 p-3">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Select value={room.type} onValueChange={(v: string | null) => v && onUpdate({ type: v })}>
            <SelectTrigger className="w-full"><SelectValue placeholder={isExterior ? "Select exterior area" : "Select room"} /></SelectTrigger>
            <SelectContent>{types.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
          </Select>
          <Input placeholder="Label / number (optional)" value={room.label} onChange={(e) => onUpdate({ label: e.target.value })} />
          {room.type === "Other (specify)" && (
            <Input className="sm:col-span-2" placeholder={`Specify ${isExterior ? "area" : "room"} name`} value={room.customType} onChange={(e) => onUpdate({ customType: e.target.value })} />
          )}
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Textarea placeholder="Current-loss damage" value={room.current} onChange={(e) => onUpdate({ current: e.target.value })} />
          <Textarea placeholder="Pre-existing damage / previous repairs" value={room.preexisting} onChange={(e) => onUpdate({ preexisting: e.target.value })} />
        </div>
        <Textarea placeholder="Mitigation needed here (if any) / location note" value={room.mitigationNote} onChange={(e) => onUpdate({ mitigationNote: e.target.value })} />

        <p className="text-xs font-bold text-brand-500">Where in this {isExterior ? "area" : "room"} is damaged?</p>
        {room.components.map((c) => (
          <div key={c.id} className="rounded-md border border-brand-100 p-3">
            <div className="mb-2 flex items-center justify-between">
              <strong className="text-xs text-brand-500">Damaged component / location</strong>
              <Button type="button" variant="ghost" size="sm" className="text-red-700" onClick={() => onRemoveComponent(c.id)}>Remove</Button>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <Select value={c.type} onValueChange={(v: string | null) => v && onUpdateComponent(c.id, { type: v })}>
                <SelectTrigger className="w-full"><SelectValue placeholder="Select component" /></SelectTrigger>
                <SelectContent>{options.map((o) => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent>
              </Select>
              <Input placeholder="Specific location or number (optional)" value={c.label} onChange={(e) => onUpdateComponent(c.id, { label: e.target.value })} />
              {c.type === "Other (specify)" && (
                <Input className="sm:col-span-2" placeholder="Other component" value={c.customType} onChange={(e) => onUpdateComponent(c.id, { customType: e.target.value })} />
              )}
              <Select value={c.condition} onValueChange={(v: string | null) => v && onUpdateComponent(c.id, { condition: v })}>
                <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                <SelectContent>{["Current loss", "Pre-existing", "Both", "Unclear"].map((o) => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent>
              </Select>
              <Textarea className="sm:col-span-2" placeholder="Damage / location details" value={c.notes} onChange={(e) => onUpdateComponent(c.id, { notes: e.target.value })} />
            </div>
          </div>
        ))}
        <div className="flex gap-2">
          <Button type="button" variant="outline" size="sm" onClick={onAddComponent}>+ Add damaged component</Button>
          <Button type="button" variant="outline" size="sm" className="text-red-700" onClick={onRemove}>Remove {isExterior ? "area" : "room"}</Button>
        </div>
      </div>
    </div>
  )
}

function BuildingEditor({
  building,
  onRename,
  onAddRoom,
  onAddExterior,
  onAddUnit,
  onAddUnitRoom,
  onRemoveBuilding,
  onRemoveUnit,
  onUpdateRoom,
  onRemoveRoom,
  onAddComponent,
  onUpdateComponent,
  onRemoveComponent,
}: {
  building: Building
  onRename: (name: string) => void
  onAddRoom: () => void
  onAddExterior: () => void
  onAddUnit: () => void
  onAddUnitRoom: (unitId: string) => void
  onRemoveBuilding: () => void
  onRemoveUnit: (unitId: string) => void
  onUpdateRoom: (roomId: string, patch: Partial<Room>) => void
  onRemoveRoom: (roomId: string) => void
  onAddComponent: (roomId: string) => void
  onUpdateComponent: (roomId: string, compId: string, patch: Partial<RoomComponent>) => void
  onRemoveComponent: (roomId: string, compId: string) => void
}) {
  return (
    <div className="rounded-lg border border-brand-100">
      <div className="flex items-center justify-between border-b border-brand-100 px-3 py-2">
        <strong className="text-sm text-brand-500">{building.name || "Building / structure"}</strong>
        <Button type="button" variant="ghost" size="sm" onClick={onRemoveBuilding}>Remove</Button>
      </div>
      <div className="space-y-3 p-3">
        <Input placeholder="Main structure, Building A, detached garage..." value={building.name} onChange={(e) => onRename(e.target.value)} />

        <p className="text-sm font-bold text-brand-500">Interior rooms</p>
        {building.rooms.map((r) => (
          <RoomEditor
            key={r.id}
            room={r}
            onUpdate={(patch) => onUpdateRoom(r.id, patch)}
            onRemove={() => onRemoveRoom(r.id)}
            onAddComponent={() => onAddComponent(r.id)}
            onUpdateComponent={(compId, patch) => onUpdateComponent(r.id, compId, patch)}
            onRemoveComponent={(compId) => onRemoveComponent(r.id, compId)}
          />
        ))}
        <Button type="button" variant="outline" size="sm" onClick={onAddRoom}>+ Add room</Button>

        {building.units.length > 0 && <p className="text-sm font-bold text-brand-500">Units / suites</p>}
        {building.units.map((u) => (
          <div key={u.id} className="rounded-lg border border-brand-100 p-3">
            <div className="mb-2 flex items-center justify-between">
              <strong className="text-sm text-brand-500">Unit / suite</strong>
              <Button type="button" variant="ghost" size="sm" className="text-red-700" onClick={() => onRemoveUnit(u.id)}>Remove unit</Button>
            </div>
            {/* unit name is local-only state via onUpdateRoom pattern isn't wired for units separately; kept simple */}
            {u.rooms.map((r) => (
              <RoomEditor
                key={r.id}
                room={r}
                onUpdate={(patch) => onUpdateRoom(r.id, patch)}
                onRemove={() => onRemoveRoom(r.id)}
                onAddComponent={() => onAddComponent(r.id)}
                onUpdateComponent={(compId, patch) => onUpdateComponent(r.id, compId, patch)}
                onRemoveComponent={(compId) => onRemoveComponent(r.id, compId)}
              />
            ))}
            <Button type="button" variant="outline" size="sm" className="mt-2" onClick={() => onAddUnitRoom(u.id)}>+ Add room to unit</Button>
          </div>
        ))}
        <Button type="button" variant="outline" size="sm" onClick={onAddUnit}>+ Add unit</Button>

        <p className="text-sm font-bold text-brand-500">Exterior areas</p>
        {building.exteriors.map((r) => (
          <RoomEditor
            key={r.id}
            room={r}
            onUpdate={(patch) => onUpdateRoom(r.id, patch)}
            onRemove={() => onRemoveRoom(r.id)}
            onAddComponent={() => onAddComponent(r.id)}
            onUpdateComponent={(compId, patch) => onUpdateComponent(r.id, compId, patch)}
            onRemoveComponent={(compId) => onRemoveComponent(r.id, compId)}
          />
        ))}
        <Button type="button" variant="outline" size="sm" onClick={onAddExterior}>+ Add exterior area</Button>
      </div>
    </div>
  )
}

function ReviewSummary({
  form,
  mitigation,
  buildings,
  repairLocations,
  contentsLocations,
}: {
  form: ReturnType<typeof useForm<FormValues>>
  mitigation: string[]
  buildings: Building[]
  repairLocations: LinkedLocation[]
  contentsLocations: LinkedLocation[]
}) {
  const d = form.getValues()
  const name = [d.insured1, d.insured2].filter(Boolean).join(" / ")
  return (
    <div className="space-y-3">
      <div className="rounded-lg border border-brand-100 p-3 text-sm">
        <h3 className="mb-1 font-bold text-brand-500">Client & claim</h3>
        <p><b>Insured:</b> {name || "—"}</p>
        <p><b>Insured 1 contact:</b> {[d.insured1_cell, d.insured1_email].filter(Boolean).join(" · ") || "—"}</p>
        <p><b>Damaged property:</b> {d.damage_address || "—"}</p>
        <p><b>Loss:</b> {[d.loss_type, d.date_loss].filter(Boolean).join(" · ") || "—"}</p>
        <p><b>Claim situation:</b> {d.claim_situation || "—"}</p>
        <p><b>Carrier:</b> {d.insurance_company || "—"}</p>
        <p><b>Policy #:</b> {d.policy_number || "—"}</p>
        <p><b>Claim #:</b> {d.claim_number || "—"}</p>
        <p><b>Mitigation:</b> {mitigation.join(", ") || "—"}</p>
      </div>
      {buildings.map((b) => {
        const entries = [
          ...b.rooms.map((r) => ({ r, loc: "" })),
          ...b.exteriors.map((r) => ({ r, loc: "Exterior" })),
          ...b.units.flatMap((u) => u.rooms.map((r) => ({ r, loc: u.name || "Unnamed unit" }))),
        ]
        return (
          <div key={b.id} className="rounded-lg border border-brand-100 p-3 text-sm">
            <h3 className="mb-1 font-bold text-brand-500">{b.name || "Structure"}</h3>
            {entries.length === 0 && <p className="text-muted-foreground">No damaged areas added.</p>}
            {entries.map(({ r, loc }) => {
              const rname = (r.type === "Other (specify)" ? r.customType : r.type) || "Unspecified area"
              return (
                <p key={r.id}>
                  <b>{[loc, rname, r.label].filter(Boolean).join(" / ")}</b>: {r.components.length} component(s)
                  {r.current ? ` · ${r.current}` : ""}
                </p>
              )
            })}
          </div>
        )
      })}
      {d.repairs === "Yes" && (
        <div className="rounded-lg border border-brand-100 p-3 text-sm">
          <h3 className="mb-1 font-bold text-brand-500">Prior repairs reported</h3>
          {repairLocations.length === 0 && <p className="text-muted-foreground">Locations not specified</p>}
          {repairLocations.map((r) => (
            <p key={r.id}><b>{(r.type === "Other (specify)" ? r.customType : r.type) || r.kind}{r.label ? ` · ${r.label}` : ""}:</b> {r.notes || "—"}</p>
          ))}
        </div>
      )}
      {d.contents === "Yes" && (
        <div className="rounded-lg border border-brand-100 p-3 text-sm">
          <h3 className="mb-1 font-bold text-brand-500">Damaged contents reported</h3>
          {contentsLocations.length === 0 && <p className="text-muted-foreground">Locations not specified</p>}
          {contentsLocations.map((r) => (
            <p key={r.id}><b>{(r.type === "Other (specify)" ? r.customType : r.type) || "Room"}{r.label ? ` · ${r.label}` : ""}:</b> {r.notes || "—"}</p>
          ))}
        </div>
      )}
    </div>
  )
}
