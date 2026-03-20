<script setup lang="ts">
  import { APP_NAME } from '@/config/env'
  import LegalContactCard from '@/components/other/LegalContactCard.vue'

  const lastUpdated = 'March 2026'
</script>

<template>
  <div class="bg-gray-900 px-6 py-24 sm:py-32 lg:px-8">
    <div class="mx-auto max-w-4xl">
      <header class="text-center">
        <p class="text-base/7 font-semibold text-indigo-400">Legal</p>
        <h1 class="mt-2 text-4xl font-semibold tracking-tight text-balance text-white sm:text-5xl">
          Terms of Use
        </h1>
        <p class="mx-auto mt-6 max-w-2xl text-lg/8 text-gray-300">
          Please read these terms carefully before using {{ APP_NAME }}. By using the service, you agree to them.
        </p>
        <p class="mt-4 text-sm text-gray-500">
          Last updated: {{ lastUpdated }}
        </p>
      </header>

      <main class="mt-16 space-y-12 text-base/7 text-gray-400">
        <section>
          <h2 class="text-2xl font-bold tracking-tight text-white">Agreement to Terms</h2>
          <div class="mt-4 space-y-4">
            <p>
              These Terms of Use govern your use of {{ APP_NAME }}, a platform for discovering, copying and sharing AI prompts.
            </p>
            <p>
              By accessing or using {{ APP_NAME }}, you agree to be bound by these Terms. If you do not agree, you must not use the service.
            </p>
            <p>
              These Terms apply to visitors, registered users, prompt creators, and anyone else who accesses the platform.
            </p>
          </div>
        </section>

        <section>
          <h2 class="text-2xl font-bold tracking-tight text-white">Description of Service</h2>
          <div class="mt-4 space-y-4">
            <p>
              {{ APP_NAME }} is a community-driven web platform where users can publish prompts for AI tools, browse prompts created by others,
              copy prompts with one click, and manage the prompts they have added.
            </p>
            <p>The service may include features such as:</p>
            <ul class="list-disc space-y-1 pl-6">
              <li>Publishing prompts for public viewing</li>
              <li>Uploading images associated with prompts</li>
              <li>Browsing prompts by other creators</li>
              <li>Copying prompts for use in external AI tools</li>
              <li>Editing or deleting prompts you created</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 class="text-2xl font-bold tracking-tight text-white">Account Registration and Security</h2>
          <div class="mt-4 space-y-4">
            <p>
              To create and publish prompts, you must register for an account and provide accurate and complete information.
            </p>
            <p>When you create an account, you agree to:</p>
            <ul class="list-disc space-y-1 pl-6">
              <li>Be at least 13 years old, or the minimum age required in your jurisdiction</li>
              <li>Provide truthful, current, and complete registration information</li>
              <li>Keep your login credentials confidential</li>
              <li>Accept responsibility for activity under your account</li>
            </ul>
            <p>
              You must notify us promptly if you believe your account has been accessed without authorization.
            </p>
          </div>
        </section>

        <section>
          <h2 class="text-2xl font-bold tracking-tight text-white">Public Nature of the Service</h2>
          <div class="mt-4 space-y-4">
            <div class="rounded-2xl border border-indigo-500/20 bg-indigo-500/10 p-4">
              <p class="text-sm font-medium text-indigo-300">
                {{ APP_NAME }} is built for sharing. Everything you publish on {{ APP_NAME }} is public.
              </p>
            </div>
            <p>
              This includes your prompt content, prompt titles, descriptions, uploaded prompt images, and your username as shown in connection with your content.
            </p>
            <p>
              The only information that is not public by default is your email address and password.
            </p>
            <p>
              Because the service is designed for public sharing, you should never publish confidential, sensitive, proprietary, or personal information in prompts or prompt images.
            </p>
          </div>
        </section>

        <section>
          <h2 class="text-2xl font-bold tracking-tight text-white">Acceptable Use</h2>
          <div class="mt-6 space-y-8">
            <section>
              <h3 class="text-xl font-semibold text-white">Permitted Use</h3>
              <p class="mt-3">You may use {{ APP_NAME }} for lawful purposes, including:</p>
              <ul class="mt-3 list-disc space-y-1 pl-6">
                <li>Sharing prompts with the public</li>
                <li>Exploring prompts created by others</li>
                <li>Educational, creative, research, or professional use</li>
                <li>Using copied prompts in third-party AI tools at your own discretion</li>
              </ul>
            </section>

            <section>
              <h3 class="text-xl font-semibold text-white">Prohibited Activities</h3>
              <p class="mt-3">You agree not to:</p>
              <ul class="mt-3 list-disc space-y-1 pl-6">
                <li>Use the platform for illegal activity or to violate any applicable law</li>
                <li>Publish unlawful, abusive, threatening, hateful, or malicious content</li>
                <li>Upload malware, malicious code, or harmful files</li>
                <li>Attempt to gain unauthorized access to accounts, systems, or data</li>
                <li>Scrape, overload, disrupt, or interfere with the platform in a harmful manner</li>
                <li>Impersonate another person or misrepresent ownership or authorship</li>
                <li>Publish content that infringes third-party intellectual property or privacy rights</li>
              </ul>
            </section>
          </div>
        </section>

        <section>
          <h2 class="text-2xl font-bold tracking-tight text-white">Your Content and Responsibility</h2>
          <div class="mt-6 space-y-8">
            <section>
              <h3 class="text-xl font-semibold text-white">Responsibility for What You Publish</h3>
              <p class="mt-3">
                You are solely responsible for the prompts, images, text, and other material you publish on {{ APP_NAME }}.
                You represent and warrant that you have the rights needed to publish that content and make it publicly available.
              </p>
            </section>

            <section>
              <h3 class="text-xl font-semibold text-white">Loss of Control After Publication</h3>
              <p class="mt-3">
                You may edit or delete prompts you created from your account dashboard. However, once a prompt has been published,
                other people may already have viewed it, copied it, screenshotted it, archived it, or republished it elsewhere.
              </p>
              <p class="mt-3">
                That means you may lose practical control over the prompt after publication, even if you later edit or delete it on {{ APP_NAME }}.
              </p>
            </section>

            <section>
              <h3 class="text-xl font-semibold text-white">Ownership and Reuse</h3>
              <p class="mt-3">
                By publishing content on {{ APP_NAME }}, you acknowledge that the platform is built around public copying and reuse.
                Other users may copy, adapt, republish, or otherwise use your public prompts, whether on {{ APP_NAME }} or elsewhere.
              </p>
              <p class="mt-3">
                In practical terms, publishing a prompt on {{ APP_NAME }} means you give up exclusive control over it.
              </p>
            </section>
          </div>
        </section>

        <section>
          <h2 class="text-2xl font-bold tracking-tight text-white">Intellectual Property Rights</h2>
          <div class="mt-6 space-y-8">
            <section>
              <h3 class="text-xl font-semibold text-white">Our Platform</h3>
              <p class="mt-3">
                The {{ APP_NAME }} platform, including its design, branding, code, features, functionality, and overall look and feel,
                belongs to us and is protected by intellectual property laws.
              </p>
            </section>

            <section>
              <h3 class="text-xl font-semibold text-white">Your Content vs. the Platform</h3>
              <p class="mt-3">
                You remain responsible for the content you publish, but publishing content on {{ APP_NAME }} does not give you any ownership rights in the platform itself.
              </p>
            </section>

            <section>
              <h3 class="text-xl font-semibold text-white">Third-Party Rights</h3>
              <p class="mt-3">
                You must not publish prompts, images, or other content that infringes another person&apos;s copyright, trademark, confidentiality, or other rights.
              </p>
            </section>
          </div>
        </section>

        <section>
          <h2 class="text-2xl font-bold tracking-tight text-white">Third-Party AI Tools</h2>
          <div class="mt-4 space-y-4">
            <p>
              {{ APP_NAME }} is tool-agnostic. Prompts shared on the platform may be intended for ChatGPT, Claude, Midjourney, DALL-E, Stable Diffusion, or other AI tools.
            </p>
            <p>
              We do not control those third-party tools, their outputs, or their terms. Your use of copied prompts in any third-party service is at your own risk and subject to that service&apos;s own rules.
            </p>
          </div>
        </section>

        <section>
          <h2 class="text-2xl font-bold tracking-tight text-white">Service Availability</h2>
          <div class="mt-4 space-y-4">
            <p>
              We aim to keep {{ APP_NAME }} available and working reliably, but we do not guarantee uninterrupted or error-free service.
            </p>
            <p>Interruptions may happen due to maintenance, updates, technical issues, security incidents, abuse prevention, or third-party infrastructure outages.</p>
          </div>
        </section>

        <section>
          <h2 class="text-2xl font-bold tracking-tight text-white">Privacy and Data Protection</h2>
          <div class="mt-4 space-y-4">
            <p>
              Our handling of personal data is described in our separate Cookies &amp; Privacy Policy, which forms part of these Terms.
            </p>
            <div class="rounded-2xl border border-white/10 bg-gray-800/60 p-4 text-sm text-gray-300">
              Please read the Cookies &amp; Privacy Policy carefully, especially the parts explaining which information is public by design on {{ APP_NAME }}.
            </div>
          </div>
        </section>

        <section>
          <h2 class="text-2xl font-bold tracking-tight text-white">Account and Content Removal</h2>
          <div class="mt-6 space-y-8">
            <section>
              <h3 class="text-xl font-semibold text-white">By You</h3>
              <p class="mt-3">
                You may edit or delete prompts you created, and you may delete your account subject to the features available in the service.
              </p>
            </section>

            <section>
              <h3 class="text-xl font-semibold text-white">By Us</h3>
              <p class="mt-3">We may suspend, restrict, remove content, or terminate accounts if needed, including where:</p>
              <ul class="mt-3 list-disc space-y-1 pl-6">
                <li>These Terms are violated</li>
                <li>Content is unlawful or creates legal risk</li>
                <li>Content is abusive, harmful, or infringes rights</li>
                <li>Security or platform integrity requires it</li>
                <li>We need to comply with legal obligations</li>
              </ul>
            </section>
          </div>
        </section>

        <section>
          <h2 class="text-2xl font-bold tracking-tight text-white">Disclaimers and Limitation of Liability</h2>
          <div class="mt-4 space-y-4">
            <div class="rounded-2xl border border-white/10 bg-gray-800/60 p-6">
              <p class="font-semibold text-white">No Warranty</p>
              <p class="mt-2 text-sm text-gray-300">
                {{ APP_NAME }} is provided on an “as is” and “as available” basis without warranties of any kind.
              </p>
            </div>
            <div class="rounded-2xl border border-white/10 bg-gray-800/60 p-6">
              <p class="font-semibold text-white">User-Generated Content</p>
              <p class="mt-2 text-sm text-gray-300">
                We do not guarantee the quality, usefulness, legality, originality, or accuracy of prompts published by users.
              </p>
            </div>
            <div class="rounded-2xl border border-white/10 bg-gray-800/60 p-6">
              <p class="font-semibold text-white">Limitation of Liability</p>
              <p class="mt-2 text-sm text-gray-300">
                To the maximum extent permitted by law, we are not liable for indirect, incidental, special, consequential, or punitive damages arising from your use of the service.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 class="text-2xl font-bold tracking-tight text-white">Changes to These Terms</h2>
          <div class="mt-4 space-y-4">
            <p>
              We may modify these Terms from time to time. Updated terms will be posted on this page with a revised date.
            </p>
            <p>
              Your continued use of {{ APP_NAME }} after changes take effect means you accept the updated Terms.
            </p>
          </div>
        </section>

        <section>
          <h2 class="text-2xl font-bold tracking-tight text-white">Governing Law</h2>
          <div class="mt-4 space-y-4">
            <p>
              These Terms are governed by applicable law. Any dispute related to these Terms or your use of {{ APP_NAME }} will be handled in the legally appropriate forum.
            </p>
          </div>
        </section>

        <section>
          <h2 class="text-2xl font-bold tracking-tight text-white">Contact Information</h2>
          <div class="mt-4 space-y-4">
            <p>If you have questions about these Terms of Use, please contact us.</p>
            <LegalContactCard />
          </div>
        </section>
      </main>
    </div>
  </div>
</template>