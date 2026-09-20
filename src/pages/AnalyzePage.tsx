import { useRef, useState } from 'react';
import { Upload, FileVideo, FileAudio, Camera, Mic, Thermometer, Droplets, Footprints, ScanLine, Info, X, Image as ImageIcon } from 'lucide-react';
import { Card, CardHeader } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input, Select } from '@/components/ui/Input';
import type { PageId } from '@/components/layout/Sidebar';
import { API_BASE_URL } from '@/lib/api';
interface UploadZoneProps {
  label: string;
  description: string;
  icon: typeof Upload;
  accent: string;
  file: File | null;
  onFile: (file: File | null) => void;
}

function UploadZone({ label, description, icon: Icon, accent, file, onFile }: UploadZoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const f = e.dataTransfer.files[0];
    if (f) onFile(f);
  };

  return (
    <div
      onClick={() => inputRef.current?.click()}
      onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
      className={`group relative cursor-pointer rounded-xl border-2 border-dashed p-6 text-center transition-all ${
        dragging
          ? 'border-brand-500 bg-brand-50/50'
          : file
          ? 'border-brand-300 bg-brand-50/30'
          : 'border-ink-200 bg-ink-50/50 hover:border-brand-400 hover:bg-brand-50/30'
      }`}
    >
      <input
        ref={inputRef}
        type="file"
        className="hidden"
        onChange={(e) => onFile(e.target.files?.[0] ?? null)}
        accept={label.includes('Image') ? 'image/*,video/*' : 'audio/*'}
      />
      {file ? (
        <div className="flex items-center justify-center gap-3">
          <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${accent}`}>
            <Icon className="h-5 w-5" />
          </div>
          <div className="text-left">
            <p className="text-sm font-semibold text-ink-800">{file.name}</p>
            <p className="text-xs text-ink-400">{(file.size / 1024).toFixed(0)} KB · Click to replace</p>
          </div>
          <button
            onClick={(e) => { e.stopPropagation(); onFile(null); }}
            className="rounded-lg p-1 text-ink-400 hover:bg-ink-200 hover:text-ink-600"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <>
          <div className={`mx-auto flex h-12 w-12 items-center justify-center rounded-xl ${accent} transition-transform group-hover:scale-110`}>
            <Icon className="h-6 w-6" />
          </div>
          <p className="mt-3 text-sm font-semibold text-ink-700">{label}</p>
          <p className="mt-1 text-xs text-ink-400">{description}</p>
          <p className="mt-2 text-xs font-medium text-brand-600">Drag & drop or click to browse</p>
        </>
      )}
    </div>
  );
}

interface FarmSliderProps {
  label: string;
  icon: typeof Thermometer;
  value: number;
  min: number;
  max: number;
  unit: string;
  onChange: (v: number) => void;
  accent: string;
}

function FarmSlider({ label, icon: Icon, value, min, max, unit, onChange, accent }: FarmSliderProps) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon className={`h-4 w-4 ${accent}`} />
          <span className="text-sm font-medium text-ink-700">{label}</span>
        </div>
        <span className="rounded-md bg-ink-100 px-2 py-0.5 text-sm font-bold text-ink-700">
          {value}{unit}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-brand-600"
      />
    </div>
  );
}

interface AnalyzePageProps {
  onNavigate: (page: PageId) => void;
}

export function AnalyzePage({ onNavigate }: AnalyzePageProps) {
  const [animalId, setAnimalId] = useState('');
  const [species, setSpecies] = useState('Cattle');
  const [age, setAge] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [temperature, setTemperature] = useState(28);
  const [humidity, setHumidity] = useState(65);
  const [activityLevel, setActivityLevel] = useState(50);

  const canAnalyze = animalId.trim() !== '' && (imageFile !== null || audioFile !== null);

const handleAnalyze = async () => {
  if (!canAnalyze) return;

  const formData = new FormData();

  formData.append('animal_id', animalId.trim());
  formData.append('species', species);

  if (age.trim() !== '') {
    formData.append('age', age);
  }

  if (imageFile) {
    if (imageFile.type.startsWith('video/')) {
      formData.append('video', imageFile);
    } else {
      formData.append('image', imageFile);
    }
  }

  if (audioFile) {
    formData.append('audio', audioFile);
  }

  formData.append('temperature', String(temperature));
  formData.append('humidity', String(humidity));

  try {
    const response = await fetch(`${API_BASE_URL}/analyze`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Analysis failed: ${response.status}`);
    }

    const result = await response.json();

    console.log('Backend analysis result:', result);

    onNavigate('processing');
  } catch (error) {
    console.error('Analysis error:', error);
    alert('Unable to connect to the analysis server. Please try again.');
  }
};

return (
    <div className="mx-auto max-w-5xl space-y-5">
      {/* Info banner */}
      <div className="flex items-start gap-3 rounded-xl border border-brand-200 bg-brand-50/60 px-4 py-3.5">
        <Info className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" />
        <div>
          <p className="text-sm font-semibold text-brand-800">Multi-signal AI health analysis</p>
          <p className="mt-0.5 text-sm text-brand-700">
            LivestockGuard AI analyses visual cues, audio patterns, behaviour indicators, and farm-condition data
            to identify potential health risks. Results are AI-assisted prototype outputs and not a veterinary diagnosis.
          </p>
        </div>
      </div>

      {/* Animal info */}
      <Card>
        <CardHeader title="Animal Information" subtitle="Identify the animal you want to analyse" icon={<ScanLine className="h-4.5 w-4.5" />} />
        <div className="grid grid-cols-1 gap-4 p-5 sm:grid-cols-3">
          <Input
            label="Animal ID"
            placeholder="e.g. LG-017"
            value={animalId}
            onChange={(e) => setAnimalId(e.target.value)}
            hint="Enter the unique identifier tag"
          />
          <Select
            label="Species"
            value={species}
            onChange={(e) => setSpecies(e.target.value)}
            options={[
              { value: 'Cattle', label: 'Cattle' },
              { value: 'Buffalo', label: 'Buffalo' },
              { value: 'Sheep', label: 'Sheep' },
              { value: 'Goat', label: 'Goat' },
              { value: 'Poultry', label: 'Poultry' },
            ]}
          />
          <Input
            label="Age (years)"
            type="number"
            placeholder="e.g. 4"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            min={0}
          />
        </div>
      </Card>

      {/* Upload areas */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <Card>
          <CardHeader
            title="Image / Video Upload"
            subtitle="Visual analysis of physical symptoms"
            icon={<Camera className="h-4.5 w-4.5" />}
          />
          <div className="p-5">
            <UploadZone
              label="Drop image or video here"
              description="JPG, PNG, MP4 up to 50MB"
              icon={FileVideo}
              accent="bg-brand-50 text-brand-600"
              file={imageFile}
              onFile={setImageFile}
            />
            <p className="mt-3 text-xs text-ink-400">
              The system analyses body condition, posture, coat quality, eye/nose discharge, and movement patterns.
            </p>
          </div>
        </Card>

        <Card>
          <CardHeader
            title="Audio Upload"
            subtitle="Audio analysis of respiratory & vocal patterns"
            icon={<Mic className="h-4.5 w-4.5" />}
          />
          <div className="p-5">
            <UploadZone
              label="Drop audio recording here"
              description="MP3, WAV, M4A up to 20MB"
              icon={FileAudio}
              accent="bg-accent-50 text-accent-600"
              file={audioFile}
              onFile={setAudioFile}
            />
            <p className="mt-3 text-xs text-ink-400">
              The system detects breathing rate, coughing, wheezing, and abnormal vocalisations.
            </p>
          </div>
        </Card>
      </div>

      {/* Farm conditions */}
      <Card>
        <CardHeader
          title="Farm Conditions"
          subtitle="Environmental and behavioural context"
          icon={<Thermometer className="h-4.5 w-4.5" />}
        />
        <div className="grid grid-cols-1 gap-5 p-5 sm:grid-cols-3">
          <FarmSlider
            label="Temperature"
            icon={Thermometer}
            value={temperature}
            min={0}
            max={50}
            unit="°C"
            onChange={setTemperature}
            accent="text-accent-600"
          />
          <FarmSlider
            label="Humidity"
            icon={Droplets}
            value={humidity}
            min={0}
            max={100}
            unit="%"
            onChange={setHumidity}
            accent="text-blue-600"
          />
          <FarmSlider
            label="Activity Level"
            icon={Footprints}
            value={activityLevel}
            min={0}
            max={100}
            unit="%"
            onChange={setActivityLevel}
            accent="text-brand-600"
          />
        </div>
      </Card>

      {/* Analyze button */}
      <div className="flex flex-col items-center gap-3 pb-4">
        <Button
          size="lg"
          icon={<ScanLine className="h-5 w-5" />}
          className="w-full max-w-md"
          disabled={!canAnalyze}
          onClick={handleAnalyze}
        >
          Analyze Animal
        </Button>
        {!canAnalyze && (
          <p className="text-sm text-ink-400">
            Enter an Animal ID and upload at least one image/video or audio file to begin analysis.
          </p>
        )}
        <p className="flex items-center gap-1.5 text-xs text-ink-400">
          <Info className="h-3.5 w-3.5" />
          Results are AI-assisted prototype outputs — not a veterinary diagnosis.
        </p>
      </div>
    </div>
  );
}
