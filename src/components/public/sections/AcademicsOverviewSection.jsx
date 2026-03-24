import React from "react";
import { motion } from "framer-motion";
import {
  FaBookOpen,
  FaBrain,
  FaGlobeAsia,
  FaGraduationCap,
  FaLayerGroup,
  FaLightbulb,
  FaMicroscope,
  FaRoute,
} from "react-icons/fa";
import { usePublicContent } from "@/hooks/usePublicContent";

const PILLAR_ICONS = [FaGraduationCap, FaLayerGroup, FaRoute, FaGlobeAsia];
const TRACK_ICONS = [FaBrain, FaBookOpen, FaLightbulb];

export default function AcademicsOverviewSection() {
  const { academics } = usePublicContent();
  const data = academics?.overview;

  if (!data) return null;

  return (
    <>
      <section className="relative overflow-hidden bg-primary text-white">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute -top-24 -left-16 w-72 h-72 rounded-full bg-accent blur-[120px]" />
          <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-secondary blur-[140px]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 pt-20 pb-28">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-bold uppercase tracking-[0.28em] text-accent"
          >
            {data.eyebrow}
          </motion.span>

          <div className="mt-8 grid items-center gap-12 lg:grid-cols-12">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-7"
            >
              <h1 className="max-w-4xl text-4xl font-heading font-black leading-tight md:text-6xl">
                {data.title}
              </h1>
              <p className="mt-6 max-w-3xl text-base leading-relaxed text-white/75 md:text-lg">
                {data.subtitle}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-5"
            >
              <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
                <div className="flex items-start gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent text-primary">
                    <FaMicroscope className="text-2xl" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.28em] text-accent">
                      Academic Approach
                    </p>
                    <h2 className="mt-3 text-2xl font-heading font-extrabold">
                      {data.futureReady.title}
                    </h2>
                  </div>
                </div>

                <p className="mt-5 text-sm leading-relaxed text-white/70">
                  {data.futureReady.description}
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  {data.futureReady.badges.map((badge) => (
                    <span
                      key={badge}
                      className="rounded-full border border-accent/40 bg-accent/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-accent"
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="relative z-10 -mt-12 px-6">
        <div className="max-w-6xl mx-auto grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {data.stats.map((stat, index) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="rounded-[1.75rem] border border-accent/10 bg-white p-6 shadow-xl"
            >
              <div className="text-3xl font-black text-primary">{stat.value}</div>
              <div className="mt-2 text-xs font-bold uppercase tracking-[0.22em] text-accent">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="bg-bg px-6 py-24 text-primary">
        <div className="max-w-7xl mx-auto grid gap-10 lg:grid-cols-12">
          <div className="space-y-6 lg:col-span-7">
            {data.intro.map((paragraph, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="rounded-[2rem] border border-gray-100 bg-white p-8 shadow-sm"
              >
                <p className="text-base leading-relaxed text-muted md:text-lg">
                  {paragraph}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5"
          >
            <div className="rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-accent/10">
              <span className="text-xs font-bold uppercase tracking-[0.24em] text-accent">
                NEP 2020 Alignment
              </span>
              <h2 className="mt-4 text-3xl font-heading font-extrabold text-primary">
                Flexible pathways that let students shape their own academic
                journey.
              </h2>
              <div className="mt-8 space-y-4">
                {data.futureReady.points.map((point, index) => (
                  <div
                    key={point}
                    className="flex gap-4 rounded-2xl bg-primary/5 p-4"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary text-sm font-black text-accent">
                      {String(index + 1).padStart(2, "0")}
                    </div>
                    <p className="text-sm leading-relaxed text-muted">{point}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="bg-white px-6 py-24">
        <div className="max-w-7xl mx-auto">
          <div className="mb-14 max-w-3xl">
            <span className="text-sm font-bold uppercase tracking-[0.28em] text-accent">
              Learning Framework
            </span>
            <h2 className="mt-4 text-4xl font-heading font-extrabold text-primary md:text-5xl">
              A curriculum model that balances structure, choice, and practical
              learning.
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {data.pillars.map((pillar, index) => {
              const Icon = PILLAR_ICONS[index % PILLAR_ICONS.length];

              return (
                <motion.div
                  key={pillar.id}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                  whileHover={{ y: -6 }}
                  className="group rounded-[2rem] border border-gray-100 bg-gray-50 p-8 transition-all duration-300 hover:border-accent/20 hover:bg-primary"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/10 text-2xl text-accent group-hover:bg-accent group-hover:text-primary">
                    <Icon />
                  </div>
                  <h3 className="mt-6 text-xl font-bold text-primary group-hover:text-white">
                    {pillar.title}
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-muted group-hover:text-white/75">
                    {pillar.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-gray-50 px-6 py-24">
        <div className="max-w-7xl mx-auto grid gap-8 lg:grid-cols-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-[2rem] bg-primary p-10 text-white lg:col-span-5"
          >
            <span className="text-sm font-bold uppercase tracking-[0.28em] text-accent">
              Holistic Development
            </span>
            <h2 className="mt-4 text-3xl font-heading font-extrabold md:text-4xl">
              {data.holisticDevelopment.title}
            </h2>
            <p className="mt-6 text-base leading-relaxed text-white/75">
              {data.holisticDevelopment.description}
            </p>
          </motion.div>

          <div className="grid gap-6 lg:col-span-7 md:grid-cols-3">
            {data.holisticDevelopment.tracks.map((track, index) => {
              const Icon = TRACK_ICONS[index % TRACK_ICONS.length];

              return (
                <motion.div
                  key={track.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                  className="rounded-[2rem] border border-accent/10 bg-white p-8 shadow-sm"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/10 text-xl text-accent">
                      <Icon />
                    </div>
                    <span className="rounded-full bg-primary px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-accent">
                      {track.code}
                    </span>
                  </div>
                  <h3 className="mt-6 text-lg font-bold text-primary">
                    {track.name}
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-muted">
                    {track.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-primary px-6 py-24 text-white">
        <div className="max-w-7xl mx-auto grid items-center gap-10 lg:grid-cols-12">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-6"
          >
            <span className="text-sm font-bold uppercase tracking-[0.28em] text-accent">
              Faculty & Research
            </span>
            <h2 className="mt-4 text-4xl font-heading font-extrabold md:text-5xl">
              {data.faculty.title}
            </h2>
            <p className="mt-6 text-base leading-relaxed text-white/75 md:text-lg">
              {data.faculty.description}
            </p>
          </motion.div>

          <div className="grid gap-4 lg:col-span-6">
            {data.faculty.points.map((point, index) => (
              <motion.div
                key={point}
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
              >
                <div className="flex items-start gap-4">
                  <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent text-sm font-black text-primary">
                    {index + 1}
                  </div>
                  <p className="text-sm leading-relaxed text-white/75 md:text-base">
                    {point}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
