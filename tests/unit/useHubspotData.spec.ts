import { useHubspotData } from '@/composables/useHubspotData'

type Row = { companySize:string; industry:string; quarter:string; responseValue:string; numResponses:number }
const makeRoot = (rows: Row[]) => ({
  metadata: { title:'t', total_conversations: 0, date_range:'2024' },
  uniqueValues: { companySize:[], industry:[], quarter:[] },
  questions: [{
    questionId:'q3', questionNumber:3, questionType:'multi_response',
    question:'How is delivery quality?', description:'', data: rows
  }]
})

describe('useHubspotData', () => {
  it('aggregates rows into labels/values and builds chart config', () => {
    const root = makeRoot([
      { companySize:'Small', industry:'X', quarter:'2024-Q1', responseValue:'Розы', numResponses:10 },
      { companySize:'Small', industry:'X', quarter:'2024-Q1', responseValue:'Розы', numResponses:5 },
      { companySize:'Small', industry:'X', quarter:'2024-Q1', responseValue:'Лилии', numResponses:2 },
    ])
    const filters = { companySize:[], industry:[], quarter:[] }
    const cfg = useHubspotData(root as any, 3, filters)

    expect(cfg.type).toBe('bar')
    expect(cfg.data.labels).toEqual(['Розы','Лилии']) // отсортировано по убыванию
    expect(cfg.data.datasets[0].data).toEqual([15, 2])
    expect(cfg.options.plugins.title.text).toMatch(/delivery/i)
  })
})
